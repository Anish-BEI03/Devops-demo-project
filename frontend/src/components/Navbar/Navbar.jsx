import React, { useContext, useState, useEffect } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { DarkModeContext } from '../../context/DarkModeContext';

const Navbar = ({ setShowLogin }) => {

  const location = useLocation();
  const [menu, setMenu] = useState("menu");
  const [searchActive, setSearchActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { getTotalCartAmount, token, setToken, searchTerm, setSearchTerm } = useContext(StoreContext);

  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  const navigate = useNavigate();

  // Clear search term when navigating away from home and menu pages
  useEffect(() => {
    if (location.pathname !== '/' && location.pathname !== '/menu') {
      setSearchTerm("");
    }
  }, [location.pathname, setSearchTerm]);

  const logout = () => {
    localStorage.removeItem("token")
    setToken("");
    navigate("/")
  }

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Only scroll if we're on the home or menu page and have search input
    if (value.trim() && (location.pathname === '/' || location.pathname === '/menu')) {
      // Use setTimeout to ensure the DOM has updated
      setTimeout(() => {
        const exploreMenu = document.getElementById('explore-menu');
        if (exploreMenu) {
          exploreMenu.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  }

  const handleSearchFocus = () => {
    setSearchActive(true);
  }

  const handleSearchBlur = () => {
    if (searchTerm === "") {
      setSearchActive(false);
    }
  }

  const clearSearch = () => {
    setSearchTerm("");
    setSearchActive(false);
  }

  return (
    <div className='navbar'>
      <Link to={'/'}><img src={assets.logo} alt="" className='logo' /></Link>
      <ul className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <Link to='/' className={location.pathname === '/' && menu === "menu" ? "active" : ""} onClick={() => setMobileMenuOpen(false)}>Home</Link>
        <Link to='/menu' className={location.pathname === '/menu' ? "active" : ""} onClick={() => { setMenu("Menu"); setMobileMenuOpen(false); }}>Menu</Link>
        <a href={import.meta.env.VITE_CHAT_URL || 'http://localhost:5172'} target='_blank' rel='noopener noreferrer' onClick={() => { setMenu("Chat"); setMobileMenuOpen(false); }} className={menu === "Chat" ? "active" : ""}>Chat</a>
        <Link to='/about' className={location.pathname === '/about' ? "active" : ""} onClick={() => setMobileMenuOpen(false)}>About</Link>
        <a href='#footer' onClick={() => { setMenu("Contact Us"); setMobileMenuOpen(false); }} className={menu === "Contact Us" ? "active" : ""} >Contact Us</a>
      </ul>
      <div className="navbar-right">
        <div className={`navbar-search-wrapper ${searchActive ? 'active' : ''}`}>
          <img
            src={assets.search_icon}
            alt="search"
            className="search-icon-img"
            onClick={() => setSearchActive(!searchActive)}
          />
          <input
            type="text"
            className="navbar-search-input"
            placeholder="Search items..."
            value={searchTerm}
            onChange={handleSearch}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
          />
          {searchTerm && (
            <span className="search-clear" onClick={clearSearch}>×</span>
          )}
        </div>
        <div className="navbar-search-icon">
          <Link to={'/cart'}><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? <button onClick={() => setShowLogin(true)}>Sign In</button>
          : <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/profile')}><img src={assets.profile_icon} alt="" /><p>Profile</p></li>
              <hr />
              <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>}
        <button className="dark-mode-toggle" onClick={toggleDarkMode} title={isDarkMode ? "Light Mode" : "Dark Mode"}>
          <span className="toggle-icon">{isDarkMode ? '💡' : '🌙'}</span>
        </button>
        <img
          src={assets.menu_icon}
          alt="menu"
          className="menu-icon-mobile"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
      </div>
    </div>
  )
}

export default Navbar
