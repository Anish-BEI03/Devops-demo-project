import React from 'react'
import './Header.css'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();

  const handleViewMenu = () => {
    navigate('/menu');
  }

  const handleOrderNow = () => {
    navigate('/menu');
  }

  return (
    <div className='header' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), url(${assets.header_img})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
      <div className="header-contents">
        <div className="header-location">
          <span>📍 Delivering in Colombo & Nearby Areas</span>
        </div>
        <h2>Something to Bite? Here we are.</h2>
        <p>Freshly prepared meals, delivered straight to your doorstep with just a few clicks.</p>
        <div className="header-buttons">
          <button className="btn-primary" onClick={handleViewMenu}>View Menu</button>
          <button className="btn-secondary" onClick={handleOrderNow}>Order Now</button>
        </div>
      </div>
    </div>
  )
}

export default Header
