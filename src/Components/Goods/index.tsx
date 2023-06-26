import { useNavigate } from 'react-router-dom'
import { Input,Button ,message, Popconfirm } from 'antd';
import { useEffect, useState } from 'react'
import { Space, Table, Tag,Modal,Pagination} from 'antd';
import type { PaginationProps } from 'antd';
import {postData} from '../../Service/fetch'
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';
import './index.less'


const Goods = () =>{

    const navigate = useNavigate()
    const [isModal1Open, setIsModal1Open] = useState(false);
    const [isModal2Open, setIsModal2Open] = useState(false);
    const [goods,setGoods] = useState<DataType[]>()
    const [searchCode,setsearchCode] = useState('')
    const [searchGood,setSearchGood] = useState<DataType[]>()
    const [showall,setShowall] = useState<boolean>(true)
    const [in_num,setIn_num] = useState('')
    const [now_code,setNow_code] = useState('')
    /* const confirm = (e: React.MouseEvent<HTMLElement>|undefined) => {
      console.log(e);   
    }; */

    const [current,setCurrent] = useState(1)

    const cancel = (e: React.MouseEvent<HTMLElement>|undefined) => {
      console.log(e);
      message.error('已取消');
    };

interface DataType {
    key: string;
    code: string;
    name: string;
    type: string;
    in_price: number;
    out_price: number;
    store:number;
    supplier:string
  }
  useEffect(()=>{
    const data={
      page:current
    }
    postData('/good/info',data,'POST')
    .then(data=>{
     // console.log(data.data)
      setGoods(
        data.data.map((item:any)=>{return {
          key:item.id+"",
          code:item.code,
          name:item.name,
          type:item.category,
          in_price:item.in_price,
          out_price:item.out_price,
          store:item.left_num,
          supplier:item.supplier
        }}))
     // console.log(goods)
      }
    ).catch(error=>console.log(error))
  },[current])
  
  const columns: ColumnsType<DataType> = [
    {
      title: '商品编码',
      dataIndex: 'code',
      key: 'code',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '商品类型',
      dataIndex: 'type',
      key: 'type',
      render: (text) => (
        <Tag color={'geekblue'} key={text}>{text}</Tag>
        )
    },
    {
      title: '进价',
      key: 'in_price',
      dataIndex: 'in_price',
    },
    {
        title: '售价',
        key: 'out_price',
        dataIndex: 'out_price',
      },
      {
        title: '库存',
        key: 'store',
        dataIndex: 'store',
      },
      {
        title: '供应商',
        key: 'supplier',
        dataIndex: 'supplier',
        render: (text) => <a onClick={()=>toSupplier(text)}>{text}</a>,
      },
      {
        title: '操作',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <a onClick={()=>handleChange(record.code)}>修改</a>
            <Popconfirm
              title="删除"
              description="确定要删除这个商品吗?"
              onConfirm={()=>handleDelete(record)}
              onCancel={cancel}
              okText="确定"
              cancelText="取消"
            >
            <a >删除</a>
            </Popconfirm>
            <a onClick={()=>handleIn(record.code)}>入库</a>
          </Space>
        ),
      },
  ];

  function handleChange(code:any){
    //  修改信息
    navigate('/changegoods?code='+ code)
  }

  function handleDelete(record:DataType){
    console.log(record)
    setGoods(goods.filter((item)=>item.code!=record.code))
    message.success('删除成功');
    //调用接口
    const data = {
      code:"43284123113"
    }
    //待更改
    postData('/good',data,'POST')
    .then(data=>{
      console.log(data)
    }
    )
    .catch(error=>console.log(error))
  }

  function handleIn(code:string){
    setIsModal1Open(true);
    setNow_code(code)
  }

  function handleInput(e:{target:{value:string}}){
    setIn_num(e.target.value)
  }

  /* const data: DataType[] = [
    {
        key:'1',
        code: '43284123113',
        name:   '达利园小面包500g',
        type: '副食',
        in_price: '8元',
        out_price: '12元',
        measure:'袋',
        store:205
    },
    {
      key: '2',
      code: '43284123113',
      name:   '康师傅绿茶',
      type: '副食',
      in_price: '2.0元',
      out_price: '3元',
      measure:'瓶',
      store:300
    },
    {
      key: '3',
      code: '43284123113',
      name:   '双汇火腿肠',
      type: '副食',
      in_price: '1.2元',
      out_price: '2元',
      measure:'个',
      store:80
    },
  ]; */
//供应商查看
  function toSupplier(name:string){
    navigate('/supplier?name=' + name)
  }
//search
  function handlesearch(e:{target:{value:string}}){
    console.log(e.target.value)
    setsearchCode(e.target.value)
  }

  function Confirmsearch(){
    const data = {
      code:searchCode
    }
    postData('/good/info/single',data,'POST')
    .then(data=>{
      console.log(data)
      const good = data.data
      setSearchGood([{
        key:good.id,
        code:good.code,
        name: good.name,
        type: good.category,
        in_price: good.in_price,
        out_price:good.out_price,
        store:good.left_num,
        supplier:good.supplier
      }])
      setShowall(false)
    })
  }
  function handleAll(){
    setSearchGood([])
    setShowall(true)
  }
//添加商品
  function handleAdd(){
    navigate('/addgoods')
  }
  const handleOk1 = () => {
    setIsModal1Open(false);
    console.log(now_code+"/"+in_num)
    const data = {
      good_code:now_code,
      num:parseInt(in_num)
    }
    postData('/good/store',data,'POST')
    .then(data=>{
      console.log(data)
    })
  };

  const handlePage: PaginationProps['onChange'] = (page) => {
    console.log(page);
    setCurrent(page);
  };
  const handleCancel1 = () => {
    setIsModal1Open(false);
  };
  
    return (
        <>
            <div className='Goods'>
                <div className='G_top'>
                <Input placeholder="输入商品条形码" onChange={handlesearch} value={searchCode}/>
                <Button type="primary" icon={<SearchOutlined /> } onClick={Confirmsearch}>
                    Search
                </Button>
                <Button type="primary" onClick={handleAdd}>添加</Button>
                <Button type="primary" onClick={handleAll}>全部</Button>
                </div>
                <div className='G_main'>
                    <Table columns={columns}  dataSource={showall?goods:searchGood} />
                    <Pagination current={current} onChange={handlePage} total={30} />
                </div>
            </div>
            <Modal title="入库" open={isModal1Open} onOk={handleOk1} onCancel={handleCancel1}>
              <Input placeholder='输入进货量' onChange={handleInput}></Input>
            </Modal>
        </>
    )
}

export default Goods;