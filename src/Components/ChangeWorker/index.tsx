import { useNavigate } from 'react-router-dom'
import { Select,Input, Button ,message ,InputNumber} from 'antd'
import './index.less'
import { useEffect, useState } from 'react'
import { putData , postData} from '../../Service/fetch'


const ChangeWorker = () =>{
    
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const [edit,setEdit] = useState(false)
    const [name,setName] = useState('')
    const [type,setType] = useState('')
    const [time,setTime] = useState('')
    const [code,setCode] = useState('')
    const [phone,setPhone] = useState('')
    const [salary,setSalary] = useState<number>(0)
    const [sex,setSex] = useState('')
    const onChange = (value: string) => {
      console.log(`selected ${value}`);
      setType(value)
    };
    
   /*  const onSearch = (value: string) => {
      console.log('search:', value);
    }; */
    useEffect(()=>{

      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get('code');
      const data = {
        job_num:code
      }
      console.log(code)
        //获取信息
      postData('/worker/single',data,'POST')
      .then(data=>{
        console.log(data)
        setName(data.data.name)
        setPhone(data.data.phone)
        setSalary(data.data.salary)
        setSex(data.data.sex)
        if(data.data.role=='Worker')
          setType('店员')
        if(data.data.role=='Admin')
          setType('店长')
        if(data.data.role=='Boss')
          setType('Boss')
        setCode(data.data.job_num)
        setTime(data.data.created_at.substring(0,10))
      })

    },[])
      function handleName(e:{ target: { value: string } }){
            console.log(e.target.value)
            setName(e.target.value)
      }

      function handlephone(e:{ target: { value: string } }){
        console.log(e.target.value)
        setPhone(e.target.value)
      }
   

      function handleSalary(value:number){
        
        setSalary(value)
      }
      function back(){
        navigate(-1)
      }

      function handleEdit(){
        setEdit(true)
      }
      function handleSex( value: string){
        console.log(value)
        setSex(value)
      }

      function handleSubmit(){
        setEdit(false)
        //提交
        const data={
          name,
          sex,
          role:type=='店长'?'Admin':type=='Boss'?'Boss':'Worker',
          phone,
          salary,
        }
        console.log(data)
        putData('/worker/admin',data,'PUT')
        .then(data=>{
          console.log(data)
          messageApi.open({
            type: 'success',
            content: '修改成功',
          });
        })
        
      }

    return (
        <>
        {contextHolder}
            <div className='Addgoods'>
                <div className='back' onClick={back}>返回</div>
               <div className='add_box'>
                    <div className='row'>
                        <div className='title'>姓名</div>
                        <Input className='in' onChange={handleName} value={name} disabled={!edit}/>
                    </div>
                    <div className='row'>
                        <div className='title'>工号</div>
                        <Input disabled className='in' value={code} /* onChange={handleCode} *//>            
                    </div>
                    <div className='row'>
                        <div className='title'>手机号</div>
                        <Input disabled={!edit} className='in' value={phone} onChange={handlephone}/>
                    </div>
                    <div className='row'>
                        <div className='title'>性别</div>
                        <Select 
                            disabled={!edit}
                            className='in'
                            placeholder="选择性别"
                            optionFilterProp="children"
                            onChange={handleSex}
                            value={sex}
                            filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={[
                              {
                                value: '女',
                                label: '女',
                            },
                            {
                                value: '男',
                                label: '男',
                            }
                            ]}
                        />           
                    </div>
                    <div className='row'>
                        <div className='title'>身份</div>
                        <Select 
                            disabled={!edit}
                            className='in'
                            showSearch
                            placeholder="选择类别"
                            optionFilterProp="children"
                            onChange={onChange}
                            value={type}
                            filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={[
                              {
                                value: '店长',
                                label: '店长',
                            },
                            {
                                value: '店员',
                                label: '店员',
                            },
                            ]}
                        />           
                    </div>
                    
                    <div className='row'>
                        <div className='title'>入职时间</div>
                        <Input disabled className='in' value={time} />
                    </div>
                    <div className='row'>
                        <div className='title'>薪资</div>
                        <InputNumber disabled={!edit}  min={0} max={10000} onChange={handleSalary}  value={salary} />
                  </div>
                    <div className='row'>
                       {edit?"": <Button type='primary' onClick={handleEdit}>修改</Button>}
                       {edit? <Button type='primary' onClick={handleSubmit}>提交</Button>:''}
                      
                    </div>
                    

                </div>
            </div>
        </>
    )
}

export default ChangeWorker;