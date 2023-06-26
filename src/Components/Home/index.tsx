import { useNavigate, useSearchParams } from 'react-router-dom'
import {ContainerFilled} from '@ant-design/icons';
import './index.less'
import { useEffect,useState } from 'react';
import { getJson } from '../../Service/fetch';


const Home = () =>{

    const navigate = useNavigate()
    const [out,setOut] = useState()
    const [In,setIn] = useState()
    useEffect(()=>{
        getJson('/sale/expense')
        .then(data=>{
            console.log(data)
            setOut(data.支出)
        })
        getJson('/sale/revenue')
        .then(data=>{
            console.log(data)
            setIn(data.营业额)
        })
    })
    return (
        <>
            <div className='Home'>
                <div className='h_top'>
                    <div className='income'>
                        <div className='i_top'>
                            <div className='icon_box'>
                                <ContainerFilled style={{fontSize:30, color:'white'}} />
                            </div>
                            <div className='i_text'>
                                <p>今日营业额</p>
                                <h1 style={{fontSize:25}}>¥{In}</h1>
                            </div>
                        </div>
                        <div className='i_bottom'><span className='add'>较昨天<span style={{color:'rgb(74, 223, 148)'}}>+15%</span></span></div>
                    </div>
                    <div className='income'>
                        <div className='i_top'>
                            <div className='icon_box' style={{backgroundColor:'rgb(217, 59, 117)',boxShadow:'0px 5px 10px 2px rgb(220, 164, 184)'}}>
                                <ContainerFilled style={{fontSize:30, color:'white'}} />
                            </div>
                            <div className='i_text'>
                                <p>今日进货支出</p>
                                <h1 style={{fontSize:25}}>¥{out}</h1>
                            </div>
                        </div>
                        <div className='i_bottom'><span className='add'>较昨天<span style={{color:'rgb(74, 223, 148)'}}>+7%</span></span></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;