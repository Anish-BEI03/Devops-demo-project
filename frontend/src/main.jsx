import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import StoreContextProvider from './context/StoreContext.jsx'
import DarkModeContextProvider from './context/DarkModeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <DarkModeContextProvider>
        <StoreContextProvider>
          <App />
        </StoreContextProvider>
      </DarkModeContextProvider>
    </BrowserRouter>
  </StrictMode>
)
