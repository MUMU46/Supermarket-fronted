import { useNavigate ,useLocation} from 'react-router-dom'
import { Select ,Input, Button,message } from 'antd'
import './index.less'
import { useState,useEffect} from 'react'
import { postData, putData } from '../../Service/fetch'


const ChangeGoods = () =>{
    
    const navigate = useNavigate()

    const [messageApi, contextHolder] = message.useMessage();
    const [edit,setEdit] = useState(false)
    const [code,setCode] = useState('')
    const [name,setName] = useState('')
    const [type,setType] = useState('')
    const [in_price,setin_price] = useState('')
    const [out_price,setout_price] = useState('')
    const [supplier,setSupplier] = useState('')

    const location = useLocation();

    useEffect(()=>{
     
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get('code');
      const data = {
        code:code
      }
      postData('/good/info/single',data,'POST')
      .then(data=>{
          console.log(data)
          setCode(data.data.code)
          setName(data.data.name)
          setSupplier(data.data.supplier)
          setType(data.data.category)
          setin_price(data.data.in_price)
          setout_price(data.data.out_price)
      })
      .catch(error=>console.log(error))
    },[])
  
    const onChange = (value: string) => {
        console.log(`selected ${value}`);
        setType(value)
      };
      
      const onSearch = (value: string) => {
        console.log('search:', value);
      };



      function handleCode(e:{ target: { value: string } }){
            setCode(e.target.value)
      }

      function handleName(e:{ target: { value: string } }){
            console.log(e.target.value)
            setName(e.target.value)
      }

      function handleIn(e:{ target: { value: string } }){
        console.log(e.target.value)
        setin_price(e.target.value)
      }
      function handleOut(e:{ target: { value: string } }){
        console.log(e.target.value)
        setout_price(e.target.value)
      }
      function handlenum(e:{ target: { value: string } }){
        console.log(e.target.value)
        setSupplier(e.target.value)
      }
      
      function back(){
        navigate(-1)
      }

      function handleEdit(){
        setEdit(true)
      }

      function handleSubmit(){
        setEdit(false)
        //提交数据
        const data = {
          code,
          name:name,
          category:type,
          in_price:parseFloat(in_price),
          out_price:parseFloat(out_price),
          supplier
        }
        console.log(data)
        putData('/good/modify',data,'PUT')
        .then(data=>{

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
                        <div className='title'>商品编号</div>
                        <Input className='in' onChange={handleCode} value={code} disabled={!edit}/>
                    </div>
                    <div className='row'>
                        <div className='title'>商品名称</div>
                        <Input className='in' onChange={handleName} value={name} disabled={!edit}/>
                    </div>
                    <div className='row'>
                        <div className='title'>商品类别</div>
                        <Select 
                            disabled={!edit}
                            className='in'
                            showSearch
                            placeholder="选择类别"
                            optionFilterProp="children"
                            onChange={onChange}
                            onSearch={onSearch}
                            value={type}
                            filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={[
                            {
                                value: '副食',
                                label: '副食',
                            },
                            {
                                value: '百货',
                                label: '百货',
                            },
                            {
                                value: '粮食',
                                label: '粮食',
                            },
                            {
                              value: '奶制品',
                              label: '奶制品',
                          },
                            {
                                value: '服装',
                                label: '服装',
                            },
                            {
                                value: '酒水饮料',
                                label: '酒水饮料',
                            },
                            {
                                value: '洗化用品',
                                label: '洗化用品',
                            }
                            ]}
                        />            
                    </div>
                    <div className='row'>
                        <div className='title'>进价</div>
                        <Input disabled={!edit} className='in' value={in_price} onChange={handleIn}/>
                    </div>
                    <div className='row'>
                        <div className='title'>销售单价</div>
                        <Input disabled={!edit} className='in' value={out_price} onChange={handleOut}/>
                    </div>
                    <div className='row'>
                        <div className='title'>供应商名称</div>
                        <Input disabled={!edit} className='in' value={supplier} onChange={handlenum}/>
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

export default ChangeGoods;