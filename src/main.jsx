import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Bell, Sparkles } from 'lucide-react'
import { APPS, SYSTEM, quickActions } from './system/core.js'
import { Taskbar } from './components/Taskbar.jsx'
import { Window } from './components/Window.jsx'
import './styles.css'
import './styles/wallpaper.css'

function App() {
  const [activeItem, setActiveItem] = useState(null)
  const [actionCenterOpen, setActionCenterOpen] = useState(false)

  return (
    <main className="desktop nasaDesktop">
      <div className="portraitBlock">
        <Sparkles size={42} />
        <h1>Vire o aparelho</h1>
        <p>{SYSTEM.orientationMessage}</p>
      </div>

      <div className="desktopContent">
        <div className="systemLabel">
          <span>{SYSTEM.name}</span>
          <small>{SYSTEM.tagline}</small>
        </div>

        <div className="scanLine" />

        <div className="iconsGrid">
          {APPS.map((item) => {
            const Icon = item.icon
            return (
              <button key={item.id} className="desktopIcon" onClick={() => setActiveItem(item)}>
                <span className="iconPlate"><Icon size={20} /></span>
                <span>{item.name}</span>
              </button>
            )
          })}
        </div>

        {activeItem && <Window item={activeItem} onClose={() => setActiveItem(null)} />}

        {actionCenterOpen && (
          <aside className="actionCenter">
            <header>
              <strong>Central de ações</strong>
              <Bell size={15} />
            </header>
            <div className="notificationCard">
              <b>{SYSTEM.name}</b>
              <span>Sistema pronto para virar seu PC virtual na nuvem.</span>
            </div>
            <div className="quickActions">
              {quickActions.map((action) => <button key={action}>{action}</button>)}
            </div>
          </aside>
        )}

        <Taskbar items={APPS} onOpen={setActiveItem} onToggleActions={() => setActionCenterOpen(!actionCenterOpen)} />
      </div>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
