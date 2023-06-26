import { useNavigate, useSearchParams } from 'react-router-dom'
import { Input,Button ,message, Popconfirm ,InputNumber} from 'antd';
import { Space, Table, Modal,Pagination} from 'antd';
import {useState,useEffect} from 'react';
import type { ColumnsType } from 'antd/es/table';
import type { PaginationProps } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './index.less'
import { postData } from '../../Service/fetch';


const AllSupplier = () =>{

    const navigate = useNavigate()
    const [suppliers,setSuppliers] = useState<DataType []>()
    const [current,setCurrent] = useState(1)
    const confirm = (e: React.MouseEvent<HTMLElement>|undefined) => {
        console.log(e);
        message.success('删除成功');
      };
      const cancel = (e: React.MouseEvent<HTMLElement>|undefined) => {
        console.log(e);
        message.error('已取消');
      };
  
      useEffect(()=>{
        const data={
            page:current
        }
        postData('/supplier/all',data,'POST')
        .then(
            data=>{
                console.log(data)
                setSuppliers(data.data.map((item:any)=>{return {
                    key:item.id+"",
                    name: item.name,
                    contact_people:item.contact_people,
                    phone: item.phone,
                    area: item.area,
                  }}))
            }
        )
      },[current])
    interface DataType {
        code: string;
        key: string;
        name: string;
        contact_people:string;
        phone: string;
        area:string
      }
  
      const columns: ColumnsType<DataType> = [
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '联系人',
          dataIndex: 'contact_people',
          key: 'contact_people',
          /* render: (text) => (
            <Tag color={'geekblue'} key={text}>{text}</Tag>
            ) */
        },
        {
            title: '手机号',
            key: 'phone',
            dataIndex: 'phone',
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
              <a onClick={()=>handleChange(record.name)}>修改</a>
              <Popconfirm
                title="删除"
                description="确定要删除这个店员信息吗?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="确定"
                cancelText="取消"
                >
                <a onClick={handleDelete}>删除</a>
                </Popconfirm>
            </Space>
          ),
        },
      ];
    
      function handleChange(name:string){
        //  修改信息
        console.log(name)
        navigate('/changesupplier?name=' + name)
      }
    
      function handleDelete(){
        //调用接口
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
        navigate('/addsupplier')
      }
      const handlePage: PaginationProps['onChange'] = (page) => {
        console.log(page);
        setCurrent(page);
      };

    return (
        <>
            <div className='Team'>
                <div className='T_top'>
                    <Input placeholder="输入供应商名称" />
                    <Button type="primary" icon={<SearchOutlined />}>
                        Search
                    </Button>
                    <Button type="primary" onClick={handleAdd}>添加</Button>
                </div>
                <div className='T_main'>
                    <Table columns={columns} dataSource={suppliers} />
                    <Pagination current={current} onChange={handlePage} total={10} />
                </div>
            </div>
        </>
    
    )
}

export default AllSupplier;