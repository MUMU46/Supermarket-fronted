import { useNavigate } from 'react-router-dom'
import bkg from '../../assets/Images/login_bkg.jpg'
import { UserOutlined } from '@ant-design/icons';
//import { postData } from '../../Service/fetch'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import './index.less'
import { useState } from 'react';


const Login = () =>{

    interface Logindata{
        job_num:string,
        password:string
    }

    const [number,setNumber] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()

    function handlechange1 (e: { target: { value: string } }){
        //console.log(e.target.value)
        setNumber(e.target.value)
    }

    function handlePassword(e: { target: { value: string } }){
        //console.log(e.target.value)
        setPassword(e.target.value)
    }

    async function Login(){
        //获取身份
        const data:Logindata = {
            job_num:number,
            password:password
        }
        //console.log(data)
        const res = await fetch('http://47.99.191.1:8467/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        const json = res.json()

        json.then(
            data => {
                 console.log(data);
                const token = data.token
                localStorage.setItem('token',token)
                if(data.role=='Boss'||data.role=='Admin')
                    navigate('/manager')
                if(data.role=='Worker')
                    navigate('/staff')
        }).catch(error=>console.log(error))
    }

    return (
        <>
            <div className='login'>
                <div className='bk-left'></div>
                <div className='bk-right'></div>
                <img src={bkg} className='bkg'></img>
                <div className='window'>
                    <Input size="large" placeholder="请输入工号" prefix={<UserOutlined />} onChange={handlechange1} value={number} />
                    <Input.Password size='large'
                        placeholder="请输入密码"
                        value={password}
                        onChange={handlePassword}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />   
                    <Button type="primary" onClick={Login}>登陆</Button>               
                </div>
            </div>
        </>
    )
}

export default Login