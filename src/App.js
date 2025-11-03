import logo from './logo.svg';
import './App.css';
import Header from './component/Header';
import Footer from './component/Footer';
import Home from './pages/Home';
import Accessories from './pages/Accessories';
import Cricket from './pages/Cricket';
import Badminton from './pages/Badminton';
import About from './pages/About';
import 'bootstrap-icons/font/bootstrap-icons.css'
import Login from './pages/Login';
import Register from './pages/Register';
import Resetpassword from  './pages/Forgetpassword';
import ProfilePage from './pages/ProfilePage';
import Cart from './pages/Cartpage';
import OrderHistory from "./pages/OrderHistory";

import {BrowserRouter,Route,Routes} from "react-router-dom"

function App() {
  return (
    <div className="App">
      
      
      <BrowserRouter>
      <Header/>
      <Routes>
        
        <Route path='/' element={<Home/>}/>
        <Route path='/accessories' element={<Accessories/>}/>
        <Route path='/Cricket' element={<Cricket/>}/>
        <Route path='/Badminton' element={<Badminton/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/reset-password' element={<Resetpassword/>}/>
        <Route path='/Profile' element={<ProfilePage/>}/>
        <Route path='/Cart' element ={<Cart/>}/>
        <Route path="/orders" element={<OrderHistory />} />


      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
