import router from './router';
import { useEffect } from 'react'
import { useRoutes ,useNavigate } from 'react-router-dom';


const  App =()=> {

  const navigate=useNavigate()
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(!token){
        navigate('/login')
    }
},[navigate])

  return useRoutes(router);
}

export default App;
