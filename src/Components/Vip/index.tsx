import { useNavigate, useSearchParams } from 'react-router-dom'
import { Input,Button,message, Popconfirm} from 'antd';
import { Space, Table,Pagination } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { PaginationProps } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useEffect ,useState} from 'react';
import { postData, putData } from '../../Service/fetch';
import './index.less'


const Vip = () =>{

    const navigate = useNavigate()
    const [vips,setVips] = useState<DataType []>()
    const [current,setCurrent] = useState(1)
      const cancel = (e: React.MouseEvent<HTMLElement>|undefined) => {
        console.log(e);
        message.error('已取消');
      };
    interface DataType {
        key: string;
        name: string;
        phone: string;
        credit: number;
        time: string;
        area:ScrollSetting
      }
      useEffect(()=>{
        const data={
          page:current
        }
        postData('/customer/all',data,'POST')
        .then(data=>{
          console.log(data.data)
          setVips(
            data.data.map((item:any)=>{return {
              key:item.id+"",
              name:item.name,
              sex:item.sex,
              area:item.area,
              phone:item.phone,
              credit:item.total_credit,
              time:item.created_at.substring(0,10)
            }}))
          console.log(vips)
          }
        ).catch(error=>console.log(error))
      },[current])
      const columns: ColumnsType<DataType> = [
        {
          title: '会员姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '手机号',
          dataIndex: 'phone',
          key: 'phone',
          /* render: (text) => (
            <Tag color={'geekblue'} key={text}>{text}</Tag>
            ) */
        },
        {
          title: '积分',
          key: 'credit',
          dataIndex: 'credit',
        },
        {
            title: '注册时间',
            key: 'time',
            dataIndex: 'time',
          },
          {
            title: '地址',
            key: 'area',
            dataIndex: 'area',
          },
        {
          title: '操作',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <a onClick={()=>handleChange(record.phone)}>修改</a>
              <Popconfirm
                title="删除"
                description="确定要删除这个会员信息吗?"
                onConfirm={()=>handleDelete(record.phone)}
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
    
      function handleChange(phone:string){
        //  修改信息
       
        navigate('/changevip?phone=' + phone)
      }
    
      function handleDelete(phone:string){
        //调用接口
        const data = {
          phone
        }
        postData('/customer/remove',data,'POST')
        .then(data=>{
          //console.log(data)
          setVips(vips.filter((item)=>item.phone!=phone))
          message.success('删除成功');
        })
        
      }
      const handlePage: PaginationProps['onChange'] = (page) => {
       // console.log(page);
        setCurrent(page);
      };

      function handleAdd(){
        navigate('/addvip')
      }
    return (
        <>
            <div className='Vip'>
                <div className='V_top'>
                    <Input placeholder="输入会员手机号" />
                    <Button type="primary" icon={<SearchOutlined />}>
                        Search
                    </Button>
                    <Button type="primary" onClick={handleAdd}>添加</Button>
                </div>
                <div className='V_main'>
                    <Table columns={columns} dataSource={vips} />
                    <Pagination current={current} onChange={handlePage} total={40} />
                </div>
            </div>
        </>
    )
}

export default Vip;