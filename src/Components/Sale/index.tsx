import { useNavigate, useSearchParams } from 'react-router-dom'
import { Input,Button ,message, Popconfirm ,InputNumber} from 'antd';
import { Space, Table, Modal} from 'antd';
import {useState} from 'react';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';
import './index.less'
import { postData } from '../../Service/fetch';


const Sale = () =>{

    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);
    const [code,setCode] = useState('')
    const [price,setPrice] = useState('')
    const [num, setNum] = useState('')
    const [customer_phone,setCustomer_phone] = useState('')

    const confirm = (e: React.MouseEvent<HTMLElement>|undefined) => {
        console.log(e);
        message.success('删除成功');
      };
      const cancel = (e: React.MouseEvent<HTMLElement>|undefined) => {
        console.log(e);
        message.error('已取消');
      };

      const [saledata,setSaledata]= useState<DataType []>([])
  
    interface DataType {
        key: string;
        customer_phone: string;
        good_id: string;
        num: string;
        price:string;
      }
      
      const columns: ColumnsType<DataType> = [
        {
          title: '会员手机号',
          dataIndex: 'customer_phone',
          key: 'customer_phone',
          render: (text) => <a>{text}</a>,
        },
        {
          title: '商品编号',
          dataIndex: 'good_id',
          key: 'good_id',
        },
        {
          title: '数量',
          dataIndex: 'num',
          key: 'num',
        },
        {
          title: '价格',
          key: 'price',
          dataIndex: 'price',
        },
        {
          title: '操作',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <a onClick={()=>handleChange(record)}>修改</a>
              <Popconfirm
                title="删除"
                description="确定要删除这个店员信息吗?"
                onConfirm={()=>handleDelete(record)}
                onCancel={cancel}
                okText="确定"
                cancelText="取消"
                >
                <a >删除</a>
                </Popconfirm>
            </Space>
          ),
        },
      ];
    
      function handleChange(record:any){
        //  修改信息
        setCode(record.good_id)
        setPrice(record.price)
        setNum(record.num)
        setOpen(true)
      }
    
      function handleDelete(record:any){
        //调用接口
        console.log(record)
        setSaledata(saledata.filter((item)=>item.good_id!=record.good_id))
        message.success('删除成功');
        console.log(saledata)
      }
      
   
      function handleAdd(){
        //弹窗
       setOpen(true)
      
      }
      const hideModal = () => {
        setOpen(false);
      };
      function handleOK (){
        setOpen(false)
        const data = saledata.concat({
            key: (saledata.length+1).toString(),
            customer_phone: customer_phone,
            good_id: code,
            num: num,
            price:price,
        })
        setSaledata(data)
      }

        
        function handlecode(e: { target: { value: string } }){
            setCode(e.target.value)
        }
        function handleprice(e: { target: { value: string } }){
            setPrice(e.target.value)
        }

        function handlephone(e: { target: { value: string } }){
            setCustomer_phone(e.target.value)
        }
        
        function handlenum(e: { target: { value: string } }){
            setNum(e.target.value)
        }
        function handleBuy(){

            console.log("confirm"+saledata.length)
           
            const saleinfo = {
                customer_phone,
                sales:[ saledata.map(item=>{return{
                    price:parseFloat(item.price),
                    good_code:parseInt(item.good_id),
                    num:parseInt(item.num)
                }})]
            }
            const data={saleinfo}

            postData('/sale',data,'POST')
            .then(data=>{
                console.log(data)
                messageApi.open({
                    type: 'success',
                    content: '提交成功',
                  });
            }).catch(error=>console.error(error)
            )
            
        }
    return (
        <>
        {contextHolder}
            <div className='Team'>
                <div className='T_top'>
                <Input className='input'value={customer_phone} onChange={handlephone} placeholder='输入会员手机号'/>
                   {/*   <Button type="primary" icon={<SearchOutlined />}>
                        Search
                    </Button> */}
                    <Button type="primary" onClick={handleAdd}>添加商品</Button>
                </div>
                <div className='T_main'>
                    <Table columns={columns} dataSource={saledata} pagination={{position:['bottomCenter']}}/>
                    <Button type='primary' onClick={handleBuy}>提交</Button>
                </div>
                
                <Modal
                    title="购买"
                    open={open}
                    onOk={handleOK}
                    onCancel={hideModal}
                    okText="确认"
                    cancelText="取消"
                    bodyStyle={{columnGap:20}}
                    centered
                >
                   <Input className='input'value={code} onChange={handlecode} placeholder='输入商品编号'/>
                   <Input className='input' value={price} onChange={handleprice} placeholder='输入商品单价'/>
                   <Input className='input' value={num} onChange={handlenum} placeholder='输入商品数量'/>
                </Modal>
                
            </div>
        </>
    )
}

export default Sale;