import { useNavigate } from 'react-router-dom'
import { Select ,Input, Button ,message ,InputNumber } from 'antd'
import './index.less'
import { postData } from '../../Service/fetch'
import { useState } from 'react'


const AddGoods = () =>{
    
    const navigate = useNavigate()
    
    const [edit,setEdit] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const [code,setCode] = useState('')
    const [name,setName] = useState('')
    const [type,setType] = useState('')
    const [in_price,setin_price] = useState<number>()
    const [out_price,setout_price] = useState<number>()
    const [number,setNumber] = useState(0)
    const [supplier,setSuppier] = useState('')
    
    const onChange = (value: string) => {
        console.log(`selected ${value}`);
        setType(value)
      };
      
      const onSearch = (value: string) => {
        console.log('search:', value);
      };

      function handleName(e:{ target: { value: string } }){
            console.log(e.target.value)
            setName(e.target.value)
      }

      function handleIn(value:number){
       
        setin_price(value)
      }
      function handleOut(value:number){
       
        setout_price(value)
      }
      function handlenum(value:number ){
        setNumber(value)
      }
      function handlesupplier( e:{ target: { value: string } }){
        console.log(e.target.value)
        setSuppier(e.target.value)
      }
      function handleCode(e:{ target: { value: string } }){
        setCode(e.target.value)
  }
      
  function handleSubmit(){
    setEdit(false)
    //提交
    const data = {
        name,
        category:type,
        in_price,
        out_price,
        origin_num:number,
        left_num:number,
        supplier,
        code
      }
      postData('/good/add',data,'POST')
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
      function back(){
        navigate(-1)
      }
    return (
        <>
        {contextHolder}
            <div className='Addgoods'>
                <div className='back' onClick={back}>返回</div>
               <div className='add_box'>
                <div className='row'>
                        <div className='title'>商品编号</div>
                        <Input className='in' onChange={handleCode}/>
                    </div>
                    <div className='row'>
                        <div className='title'>商品名称</div>
                        <Input className='in' onChange={handleName}/>
                    </div>
                    <div className='row'>
                        <div className='title'>商品类别</div>
                        <Select 
                            className='in'
                            showSearch
                            placeholder="选择商品类别"
                            optionFilterProp="children"
                            onChange={onChange}
                            onSearch={onSearch}
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
                        <InputNumber min={0} max={10000} onChange={handleIn} />
                    </div>
                    <div className='row'>
                        <div className='title'>售价</div>
                        <InputNumber min={0} max={10000} onChange={handleOut} />
                    </div>
                    <div className='row'>
                        <div className='title'>数量</div>
                        <InputNumber min={0} max={10000} onChange={handlenum} />
                    </div>
                    <div className='row'>
                        <div className='title'>供应商名称</div>
                        <Input className='in' onChange={handlesupplier}/>
                    </div>
                    <div className='row'>
                        <Button type='primary' onClick={handleSubmit}>提交</Button>
                        
                    </div>
                    

                </div>
            </div>
        </>
    )
}

export default AddGoods;