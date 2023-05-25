import { Route } from "react-router-dom";
import AlreadyLogIn from "./Components/HandlerComponents/AlreadyLogin";
import RequireLogin from "./Components/HandlerComponents/RequireLogin";
import Home from "./pages/Home/Home";
import Login from "./pages/LogIn/Login";
import SignUp from "./pages/SignUp/SignUp";

const routes = [
    {
        path:'/home',
        component: <Home />,
        requireLogin:true
    },
    {
        path:'/',
        component: <Login />,
        requireLogin:false
    },
    {
        path:'/signup',
        component: <SignUp />,
        requireLogin:false
    },
]

export default routes.map((item,index)=>{
    if(item.requireLogin === true){
        return <Route key={index} path={item.path} element={<RequireLogin>{item.component}</RequireLogin>} />
    }else{
        return <Route key={index} path={item.path} element={<AlreadyLogIn>{item.component}</AlreadyLogIn>} />
    }
})