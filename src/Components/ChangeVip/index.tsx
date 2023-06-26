import { useNavigate ,useLocation} from 'react-router-dom'
import { Select ,Input, Button ,message,InputNumber} from 'antd'
import './index.less'
import { useEffect, useState } from 'react'
import { putData,postData } from '../../Service/fetch'


const ChangeVip = () =>{
    
    const navigate = useNavigate()
    const location = useLocation();
    const [messageApi, contextHolder] = message.useMessage();
    const [edit,setEdit] = useState(false)
    const [name,setName] = useState('')
    const [credit,setCredit] = useState(0)
    const [time,setTime] = useState('')
    const [sex,setSex] = useState('')
    const [phone,setPhone] = useState('')
    const [area,setArea] = useState('')


    useEffect(()=>{
        //获取信息
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get('phone');
      const data = {
        phone:code
      }
      postData('/customer/single',data,'POST')
      .then(data=>{
          console.log(data)
          const vip = data.data
          setName(vip.name)
          setArea(vip.area)
          setCredit(vip.total_credit)
          setPhone(vip.phone)
          setSex(vip.sex)
          setTime(vip.created_at.substring(0,10))
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
      function handleArea(e:{ target: { value: string } }){
        console.log(e.target.value)
        setArea(e.target.value)
      }
   
      function handleCredit(value: number ){
        console.log(value)
        setCredit(value)
      }

      function back(){
        navigate(-1)
      }
      

      function handleEdit(){
        setEdit(true)
      }

      function handleSex(value:string){
        setSex(value)
      }

      function handleSubmit(){
        setEdit(false)
        //提交
        const data = {
          name,
          phone,
          sex,
          total_credit:credit,
          area
        }
        putData('/customer',data,'PUT')
        .then(data=>{
          console.log(data)
          switch (data.code)
          {case 200:
            messageApi.open({
              type: 'success',
              content: '修改成功',
            });break;
          default:
              messageApi.open({
                type: 'error',
                content: '修改失败',
              });
          }
        }).catch(error=>console.error(error)
        )
      }

    return (
        <>
      {contextHolder}
            <div className='Addgoods'>
                <div className='back' onClick={back}>返回</div>
               <div className='add_box'>
                   
                    <div className='row'>
                        <div className='title'>会员姓名</div>
                        <Input className='in' onChange={handleName} value={name} disabled={!edit}/>
                    </div>
                    <div className='row'>
                        <div className='title'>手机号</div>
                        <Input disabled className='in' value={phone} onChange={handlephone}/>
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
                        /> </div>
                    <div className='row'>
                        <div className='title'>积分</div>
                        <InputNumber disabled={!edit}  min={0} max={10000} onChange={handleCredit}  value={credit} />
                    </div>
                    <div className='row'>
                        <div className='title'>注册时间</div>
                        <Input disabled className='in' value={time} />
                    </div>
                    <div className='row'>
                        <div className='title'>地址</div>
                        <Input disabled={!edit} className='in' onChange={handleArea} value={area} />
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

export default ChangeVip;