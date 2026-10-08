import React, { useContext } from 'react'
import './FixedButtons.css'
import { DarkModeContext } from '../../context/DarkModeContext'

const FixedButtons = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Chat Button */}
      <a href={import.meta.env.VITE_CHAT_URL || (typeof window !== "undefined" ? `http://${window.location.hostname}:5172` : "http://localhost:5172")} target="_blank" rel="noopener noreferrer" className="chat-button">
        <span className="chat-small">Let's</span>
        <span className="chat-large">Chat</span>
      </a>

      {/* Scroll to Top Button */}
      <button className="scroll-top-button" onClick={scrollToTop}>
        <p className='arrow_up'>↑</p>
      </button>

      {/* Dark Mode Toggle Button */}
      <button className="dark-mode-button" onClick={toggleDarkMode} title={isDarkMode ? "Light Mode" : "Dark Mode"}>
        <span className="dark-mode-icon">{isDarkMode ? '💡' : '🌙'}</span>
      </button>
    </>
  )
}

export default FixedButtons
