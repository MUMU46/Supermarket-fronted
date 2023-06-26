import { useNavigate } from 'react-router-dom'
import { Select ,Input, Button ,message} from 'antd'
import './index.less'
import { useState } from 'react'
import { postData } from '../../Service/fetch'


const AddWorker = () =>{
    
  interface Workerdata{
    name:string,
    sex:string,
    job_num:string,
    role:string,
    phone:string
  }

    const navigate = useNavigate()
    
    const [edit,setEdit] = useState(true)
    const [name,setName] = useState('')
    const [sex,setSex] = useState('')
    const [role, setRole] = useState('')
    const [credit,setCredit] = useState('')
    const [code,setCode] = useState('')
    const [phone,setPhone] = useState('')
    const [messageApi, contextHolder] = message.useMessage();
    
      function handleName(e:{ target: { value: string } }){
            console.log(e.target.value)
            setName(e.target.value)
      }

      function handleSex( value: string){
        console.log(value)
        setSex(value)
      }

      function handlephone(e:{ target: { value: string } }){
        console.log(e.target.value)
        setPhone(e.target.value)
      }
      function handleCode(e:{ target: { value: string } }){
        setCode(e.target.value)
  }
      
      function back(){
        navigate(-1)
      }

      function handleSubmit(){
        //提交数据
       const data:Workerdata = {
          name:name,
          sex:sex,
          job_num:code,
          role:role,
          phone:phone
          }
        postData('/worker',data,"POST")
        .then(data=>{
          setEdit(false)
          console.log(data)
          messageApi.open({
              type: 'success',
              content: '添加成功',
            });
        })
        .catch(error=>{
          console.log(error);
          alert('上传失败!')
      })
        
      }
      const onChange = (value: string) => {
        console.log(`selected ${value}`);

        setRole(value)
      };

    return (
        <>
         {contextHolder}
            <div className='Addgoods'>
                <div className='back' onClick={back}>返回</div>
               <div className='add_box'>
                   <div className='row'>
                        <div className='title'>姓名</div>
                        <Input className='in' disabled={!edit} onChange={handleName} value={name} />
                    </div>
                    <div className='row'>
                        <div className='title'>工号</div>
                        <Input  className='in' disabled={!edit} value={code} onChange={handleCode}/>            
                    </div>
                    <div className='row'>
                        <div className='title'>手机号</div>
                        <Input className='in' disabled={!edit} value={phone} onChange={handlephone}/>
                    </div>
                    <div className='row'>
                        <div className='title'>性别</div>
                        <Select 
                            disabled={!edit}
                            className='in'
                            placeholder="选择类别"
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
                            value={role}
                            filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={[
                              {
                                value: '店长',
                                label: '店长',
                            },
                            {
                                value: '售货员',
                                label: '售货员',
                            },
                            {
                                value: '收银员',
                                label: '收银员',
                            },
                            {
                              value: '采购员',
                              label: '采购员',
                             },
                            {
                              value: '保洁',
                              label: '保洁',
                            },
                            
                            ]}
                        />           
                    </div>
                  
                    <div className='row'>
                        <Button type='primary' onClick={handleSubmit}>提交</Button>
                        
                    </div>
                    

                </div>
            </div>
        </>
    )
}

export default AddWorker;