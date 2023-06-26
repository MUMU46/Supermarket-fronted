import { useNavigate} from 'react-router-dom'
import { Input,Button ,message, Popconfirm ,Pagination} from 'antd';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { PaginationProps } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './index.less'
import { postData } from '../../Service/fetch';
import { useEffect ,useState} from 'react';


const Team = () =>{

    const navigate = useNavigate()
    const [workers,setWorkers] = useState<DataType []>([])
    const [current,setCurrent] = useState(1)
    const confirm = (e: React.MouseEvent<HTMLElement>|undefined) => {
        console.log(e);
        message.success('删除成功');
      };
      const cancel = (e: React.MouseEvent<HTMLElement>|undefined) => {
        console.log(e);
        message.error('已取消');
      };
  

  function handleDelete(record:DataType){
    console.log(record)
    setWorkers(workers.filter((item)=>item.code!=record.code))
    message.success('删除成功');
    //调用接口
    const data = {
      code:record.code
    }
    //待更改
    postData('/worker/remove',data,'POST')
    .then(data=>{
      console.log(data)
    }
    )
    .catch(error=>console.log(error))
  }
      function search(){
        const data = {
          page:1
        }
        postData('/worker/all',data,'POST')
        .then(
          data=>{
            console.log(data)
          }
        ).catch(error=>console.error(error)
        )
      }

      useEffect(()=>{
        const data = {
          page:current
        }
        postData('/worker/all',data,'POST')
        .then(data=>{
          
          console.log(data)
          setWorkers(
            data.data.map((item:any)=>{return {
              key:item.id+"",
              code: item.job_num,
              name: item.name,
              time: item.created_at.substring(0,10),
              character:item.role,
              phone: item.phone,
              salary: item.salary,
            }})
            )    
          }
      ).catch(error=>console.log(error))
      },[current])

    interface DataType {
        key: string;
        code: string;
        name: string;
        time: string;
        character:string;
        phone: string;
        salary: number;
      }
  
      const columns: ColumnsType<DataType> = [
        {
          title: '工号',
          dataIndex: 'code',
          key: 'code',
          render: (text) => <a>{text}</a>,
        },
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '入职时间',
          dataIndex: 'time',
          key: 'time',
        },
        {
          title: '身份',
          key: ' character',
          dataIndex: 'character',
          render: (text) => (
            <Tag color={'geekblue'} key={text}>{text}</Tag>
            )
        },
        {
            title: '手机号',
            key: 'phone',
            dataIndex: 'phone',
        },
        {
            title: '薪资',
            key: 'salary',
            dataIndex: 'salary',
        },
        {
          title: '操作',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <a onClick={()=>handleChange(record.code)}>修改</a>
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
    
      function handleChange(code:string){
        //  修改信息
        console.log(code)
        navigate('/changeworker?code=' + code)
      }
    
 
      
     /*  const data: DataType[] = [
        {
            key: '1',
            code: '1001',
            name: '王梅',
            time: '2022-8-1',
            character:'收银员',
            phone: '17283231',
            salary: 3500
        },
        {
            key: '2',
            code: '1002',
            name: '张小静',
            time: '2022-8-1',
            character:'导购员',
            phone: '1272122',
            salary: 2800
        },
        {
            key: '3',
            code: '1003',
            name: '李璐',
            time: '2022-2-3',
            character:'保洁',
            phone: '1822413422',
            salary: 2500
        },
      ]; */
      function handleAdd(){
        navigate('/addworker')
      }


  const handlePage: PaginationProps['onChange'] = (page) => {
    console.log(page);
    setCurrent(page);
  };
    return (
        <>
            <div className='Team'>
                <div className='T_top'>
                    <Input placeholder="输入工号" />
                    <Button type="primary" icon={<SearchOutlined />} onClick={search}>
                        Search
                    </Button>
                    <Button type="primary" onClick={handleAdd}>添加</Button>
                </div>
                <div className='T_main'>
                    <Table columns={columns} dataSource={workers} />
                    <Pagination current={current} onChange={handlePage} total={20} />
                </div>
            </div>
        </>
    )
}

export default Team;