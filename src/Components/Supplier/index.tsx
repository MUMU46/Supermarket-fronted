import { useNavigate } from 'react-router-dom'
import { Select ,Input, Button ,message} from 'antd'
import './index.less'
import { useEffect, useState } from 'react'
import { postData, putData } from '../../Service/fetch'


const Supplier = () =>{
    
    const navigate = useNavigate()

    const [messageApi, contextHolder] = message.useMessage();
    const [edit,setEdit] = useState(false)
    const [name,setName] = useState('')
    const [contact_people,setContact_people] = useState('')
    const [phone,setPhone] = useState('')
    const [area,setArea] = useState('')
/* "name": "达利园武汉分公司",
        "contact_people": "张三",
        "phone": "18601866571",
        "area": "武汉洪山区" */

    useEffect(()=>{
        const searchParams = new URLSearchParams(location.search);
        const name = searchParams.get('name');
        //获取信息
        const  data = {
            name:name
        }
        postData('/supplier/single',data,'POST')
        .then(
            data=>{
                console.log(data)
                setName(data.data.name)
                setArea(data.data.area)
                setPhone(data.data.phone)
                setContact_people(data.data.contact_people)
            }
        )
        .catch(error=>console.log(error))
    },[])

      function handleName(e:{ target: { value: string } }){
            console.log(e.target.value)
            setName(e.target.value)
      }

      function handlephone(e:{ target: { value: string } }){
        console.log(e.target.value)
        setPhone(e.target.value)
      }

      function handlearea(e:{ target: { value: string } }){
        setArea(e.target.value)
      }

      function back(){
        navigate(-1)
      }
      

      function handleEdit(){
        setEdit(true)
      }

      function handlepeple(e:{ target: { value: string } }){
        setContact_people(e.target.value)
      }
      function handleSubmit(){
        setEdit(false)
        //提交
        const data={
            name,
            contact_people,
            phone,
            area,
        }
        putData('/supplier',data,'PUT')
        .then(data=>{
            console.log(data)
        })
        messageApi.open({
          type: 'success',
          content: '修改成功',
        });
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
                        <Input className='in' onChange={handlepeple} value={contact_people} disabled={!edit}/>
                    </div>
                    <div className='row'>
                        <div className='title'>手机号</div>
                        <Input disabled={!edit} className='in' value={phone} onChange={handlephone}/>
                    </div>
                    <div className='row'>
                        <div className='title'>所在地</div>
                        <Input disabled={!edit} className='in' value={area} onChange={handlearea} />
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

export default Supplier;