import { RouteObject,Navigate } from "react-router-dom";
import S_layout from "../Components/S_layout";
import M_layout from "../Components/M_layout";
import Home from "../Components/Home";
import Login from "../Components/Login/index";
import Goods from "../Components/Goods";
import Team from "../Components/Team"
import Vip from "../Components/Vip";
import Userinfo from "../Components/Userinfo";
import AddGoods from "../Components/AddGoods";
import ChangeGoods from "../Components/ChangeGoods";
import ChangeVip from "../Components/ChangeVip";
import AddVip from "../Components/AddVip";
import ChangeWorker from "../Components/ChangeWorker";
import AddWorker from "../Components/AddWorker";
import Sale from "../Components/Sale";
import Supplier from "../Components/Supplier";
import AllSupplier from "../Components/AllSupplier";
import AddSupplier from "../Components/AddSupplier";
import ChangeSupplier from "../Components/ChangeSupplier";

const router: RouteObject[] = [
    {path:"/login",element:<Login />},
    {path:"/user",element: <Userinfo />},
    {path:"/addgoods",element: <AddGoods /> },
    {path:"/changegoods",element: <ChangeGoods />},
    {path:"/changevip",element: <ChangeVip />},
    {path:"/addvip",element: <AddVip />},
    {path:"/changeworker",element:<ChangeWorker />},
    {path:"/addworker",element:<AddWorker />},
    {path:"/supplier",element:<Supplier />},
    {path:"/addsupplier",element:<AddSupplier />},
    {path:"/changesupplier",element: <ChangeSupplier />},

    {
        path: '/',
        element: <Navigate to="/login" />//默认跳到login
    },
    {//店员
        path:"/staff",
        element:<S_layout />,
        children:[
            {path:"",element:<Navigate to="home" />},
            {path:"home",element:<Home />},
            {path:"goods",element:<Goods />},
            {path:"vip",element: <Vip />},
            {path:"sale",element: <Sale />},
            {path:"supplierall",element:<AllSupplier />},
        ]
    },
    {//管理员/店长
        path:"/manager",
        element:<M_layout />,
        children:[
            {path:"",element:<Navigate to="home" />},
            {path:"home",element:<Home />},
            {path:"goods",element:<Goods />},
            {path:"vip",element: <Vip />},
            {path:"sale",element: <Sale />},
            {path:"supplierall",element:<AllSupplier />},
             {path:"team",element:<Team />},//以下店员没有
        ]},]
export default router