import { Routes,Route } from "react-router-dom";
import Main from "./pages/Main";
import Basket from "./pages/Basket";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import Pay from "./pages/Pay";


const Routee = () => {
    return ( 
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/Basket" element={<Basket />} />
            <Route path="/Checkout" element={<Checkout />} />
            <Route path="/Pay" element={<Pay />} />
            <Route path="/Login"  element={<Login />} />
            <Route path="/Signup"  element={<Signup />} />
            <Route path="/Products"  element={<Products />} />
            <Route path="/Profile"  element={<Profile />} />
            <Route path="/ProductDetail/:id"  element={<ProductDetail />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
     );
}
 
export default Routee;