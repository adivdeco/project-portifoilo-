import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AnotherTry from './AnotherTry.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AnotherTry />
  </StrictMode>,
)
