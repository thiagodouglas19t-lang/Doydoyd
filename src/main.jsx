import React from 'react'
import { createRoot } from 'react-dom/client'
import { DesktopShell } from './components/DesktopShell.jsx'
import { useDesktop } from './system/useDesktop.js'
import './styles.css'
import './styles/wallpaper.css'

function App() {
  return <DesktopShell desktop={useDesktop()} />
}

createRoot(document.getElementById('root')).render(<App />)
