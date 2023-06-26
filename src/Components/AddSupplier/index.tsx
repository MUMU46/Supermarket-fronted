import { useNavigate } from 'react-router-dom'
import { Select ,Input, Button ,message} from 'antd'
import './index.less'
import { useState } from 'react'
import { postData } from '../../Service/fetch'


const AddSupplier = () =>{
    
    const navigate = useNavigate()
    
    const [edit,setEdit] = useState(true)
    const [name,setName] = useState('')
    const [area,setArea] = useState('')
    const [contact_people,setContact_people] = useState('')
    const [sex,setSex] = useState('')
    const [phone,setPhone] = useState('')
    const [messageApi, contextHolder] = message.useMessage();
    

      function handleName(e:{ target: { value: string } }){
            console.log(e.target.value)
            setName(e.target.value)
      }

      function handlecontact(e:{ target: { value: string } }){
      //  console.log()
        setContact_people(e.target.value)
      }

      function handlephone(e:{ target: { value: string } }){
        console.log(e.target.value)
        setPhone(e.target.value)
      }

      function handleArea(e:{ target: { value: string } }){
        console.log(e.target.value)
        setArea(e.target.value)
  }
      
      function back(){
        navigate(-1)
      }

      function handleSubmit(){
        //showmodal 提交成功
        //提交
        setEdit(false)
        const data = {
          name,
          contact_people,
          phone,
          area
        }
        postData('/supplier',data,'POST')
        .then(
          data=>{
            switch(data.code)
            {
            case 200:
            console.log(data)
            messageApi.open({
              type: 'success',
              content: '添加成功',
            });break;
            default:
              messageApi.open({
                type: 'error',
                content: '添加失败',
              });
          }
          }
        )
       
      }

    return (
        <>
         {contextHolder}
            <div className='Addgoods'>
                <div className='back' onClick={back}>返回</div>
               <div className='add_box'>
               <div className='row'>
                        <div className='title'>供应商名称</div>
                        <Input className='in' disabled={!edit} onChange={handleName} value={name} />
                    </div>
                    <div className='row'>
                        <div className='title'>联系人</div>
                        <Input className='in' disabled={!edit} value={contact_people} onChange={handlecontact}/>
                    </div>
                    <div className='row'>
                        <div className='title'>手机号</div>
                        <Input className='in' disabled={!edit} value={phone} onChange={handlephone}/>
                    </div>
                    <div className='row'>
                        <div className='title'>地址</div>
                        <Input  className='in' disabled={!edit} value={area} onChange={handleArea}/>
                    </div>
                    <div className='row'>
                        <Button type='primary' onClick={handleSubmit}>提交</Button>
                        <Button >取消</Button>
                    </div>
                    

                </div>
            </div>
        </>
    )
}

export default AddSupplier;