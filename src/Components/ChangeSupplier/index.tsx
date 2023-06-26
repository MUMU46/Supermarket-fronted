import { useNavigate ,useLocation} from 'react-router-dom'
import { Select ,Input, Button,message } from 'antd'
import './index.less'
import { useState,useEffect} from 'react'
import { postData, putData } from '../../Service/fetch'


const ChangeSupplier = () =>{
    
    const navigate = useNavigate()

    const [messageApi, contextHolder] = message.useMessage();
    const [edit,setEdit] = useState(false)
    const [area,setArea] = useState('')
    const [name,setName] = useState('')
    const [phone,setPhone] = useState('')
    const [contact,setContact] = useState('')
    const location = useLocation()

    useEffect(()=>{
     
      const searchParams = new URLSearchParams(location.search);
      const name = searchParams.get('name');
      const data = {
        name:name
      }
      postData('/supplier/single',data,'POST')
      .then(data=>{
          console.log(data)
          setName(data.data.name)
          setContact(data.data.contact_people)
          setArea(data.data.area)
          setPhone(data.data.phone)
      })
      .catch(error=>console.log(error))
    },[])
  

      function handleName(e:{ target: { value: string } }){
            console.log(e.target.value)
            setName(e.target.value)
      }

      function handlecontact(e:{ target: { value: string } }){
        console.log(e.target.value)
        setContact(e.target.value)
      }
  
      function handlearea(e:{ target: { value: string } }){
        console.log(e.target.value)
        setArea(e.target.value)
      }
      
      function back(){
        navigate(-1)
      }

      function handleEdit(){
        setEdit(true)
      }

      function handlePhone(e:{ target: { value: string } }){
        setPhone(e.target.value)
      }

      function handleSubmit(){
        setEdit(false)
        //提交数据
        const data = {
          name:name,
          contact_people:contact,
        area,
         phone
        }
        console.log(data)
        putData('/supplier',data,'PUT')
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
                        <div className='title'>供应商名称</div>
                        <Input className='in' onChange={handleName} value={name} disabled={!edit}/>
                    </div>
                    <div className='row'>
                        <div className='title'>联系人</div>
                        <Input className='in' onChange={handlecontact} value={contact} disabled={!edit}/>
                    </div>
                    <div className='row'>
                        <div className='title'>联系电话</div>
                        <Input className='in' onChange={handlePhone} value={phone} disabled={!edit}/>
                    </div> 
                    <div className='row'>
                        <div className='title'>地址</div>
                        <Input disabled={!edit} className='in' value={area} onChange={handlearea}/>
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

export default ChangeSupplier;