import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
// import App from './App.jsx'
import Homepage from './pages/homepage'
import TransferPage from './pages/Transferpage'
import SignIn from './pages/signinpage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path="/dashboard" element={<Homepage />} />
        <Route path="/transfer" element={<TransferPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)