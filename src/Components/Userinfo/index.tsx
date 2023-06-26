import { useNavigate } from 'react-router-dom'
import {Input,Select,Button,message} from 'antd'
import {useState} from 'react'
import './index.less'
import { postData } from '../../Service/fetch'

const Userinfo = () =>{
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()
    const [edit,setEdit] = useState(false)
    const [name,setName] = useState('')
    const [type,setType] = useState('')
    const [time,setTime] = useState('')
    const [code,setCode] = useState('')
    const [phone,setPhone] = useState('')
    const [password,setPassword] = useState('23124')
    const [newpassword,setNewpassword] = useState('')
    const [sex,setSex] = useState('')

    function handleName(e:{ target: { value: string } }){
        console.log(e.target.value)
        setName(e.target.value)
  }
  function handleSex( value: string){
    console.log(value)
    setSex(value)
  }

  function handleEdit(){
    setPassword('')
    setEdit(true)
  }

  function handlePass(e:{ target: { value: string } }){
    setPassword(e.target.value)
    }

    function handlenewp(e:{ target: { value: string } }){
        setNewpassword(e.target.value)
    }

  function handleSubmit(){
    //提交
    const data = {
        name:name,
        sex:sex,
        password:password,
        phone:phone,
        confirm_password:newpassword
    }
    postData('/worker/general',data,'POST')
    .then(data=>{
        setEdit(false)
        messageApi.open({
            type: 'success',
            content: '修改成功',
          });
    })
  }

  function back(){
    navigate(-1)
  }

  function handlephone(e:{ target: { value: string } }){
    console.log(e.target.value)
    setPhone(e.target.value)
  }
    return (
        <>
         {contextHolder}
         <div className='back' onClick={back}>返回</div>
            <div className='User'>
              {/*   <img className='avatar' src='' /> */}
                <div className='info'>
                <div className='row'>
                        <div className='title'>姓名</div>
                        <Input className='in' disabled={!edit} onChange={handleName} value={name} />
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
                        <div className='title'>密码</div>
                        <Input type='password'  className='in' disabled={!edit} value={password} onChange={handlePass}/>            
                    </div>
                    <div className='row'>
                        <div className='title'>确认密码</div>
                        <Input type='password'  className='in' disabled={!edit} value={newpassword} onChange={handlenewp}/>            
                    </div>
                    <div className='row'>
                       {edit?"": <Button type='primary' onClick={handleEdit}>修改</Button>}
                       {edit? <Button type='primary' onClick={handleSubmit}>提交</Button>:''}
                        <Button >取消</Button>
                    </div>    
                </div>
            </div>
        </>
    )
}

export default Userinfo;