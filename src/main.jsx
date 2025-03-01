import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
// import App from './App.jsx'
import Homepage from './pages/homepage'
import TransferPage from './pages/Transferpage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/transfer" element={<TransferPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)