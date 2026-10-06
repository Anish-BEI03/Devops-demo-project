import React, { useContext } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import { Toaster } from 'react-hot-toast'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import About from './pages/About/About'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy'
import UserProfile from './pages/UserProfile/UserProfile'
import Menu from './pages/Menu/Menu'
import { StoreContext } from './context/StoreContext'

const App = () => {

  const { showLogin, setShowLogin } = useContext(StoreContext)

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          < Route path='/' element={<Home />} />
          < Route path='/menu' element={<Menu />} />
          < Route path='/cart' element={<Cart />} />
          < Route path='/order' element={<PlaceOrder />} />
          < Route path='/verify' element={<Verify />} />
          < Route path='/myorders' element={<MyOrders />} />
          < Route path='/profile' element={<UserProfile />} />
          < Route path='/about' element={<About />} />
          < Route path='/privacy-policy' element={<PrivacyPolicy />} />
        </Routes>
      </div>
      <Footer setShowLogin={setShowLogin} />
    </>

  )
}

export default App
