import React from 'react'
import { createRoot } from 'react-dom/client'
import { Bell, Sparkles } from 'lucide-react'
import { AppButton } from './components/AppButton.jsx'
import { Taskbar } from './components/Taskbar.jsx'
import { Window } from './components/Window.jsx'
import { useDesktop } from './system/useDesktop.js'
import './styles.css'
import './styles/wallpaper.css'

function ActionCenter({ desktop }) {
  return (
    <aside className="actionCenter">
      <header><strong>Central de ações</strong><Bell size={15} /></header>
      <div className="notificationCard">
        <b>{desktop.system.name}</b>
        <span>Sistema pronto para virar seu PC virtual na nuvem.</span>
      </div>
      <div className="quickActions">{desktop.quickActions.map((action) => <button key={action}>{action}</button>)}</div>
    </aside>
  )
}

function App() {
  const desktop = useDesktop()

  return (
    <main className="desktop nasaDesktop">
      <div className="portraitBlock">
        <Sparkles size={42} />
        <h1>Vire o aparelho</h1>
        <p>{desktop.system.orientationMessage}</p>
      </div>

      <div className="desktopContent">
        <div className="systemLabel"><span>{desktop.system.name}</span><small>{desktop.system.tagline}</small></div>
        <div className="scanLine" />
        <div className="iconsGrid">{desktop.apps.map((app) => <AppButton key={app.id} app={app} mode="icon" size={20} onOpen={desktop.openApp} />)}</div>
        {desktop.activeApp && <Window item={desktop.activeApp} onClose={desktop.closeApp} />}
        {desktop.actionCenterOpen && <ActionCenter desktop={desktop} />}
        <Taskbar items={desktop.apps} onOpen={desktop.openApp} onToggleActions={desktop.toggleActions} />
      </div>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
