import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Bell, Sparkles } from 'lucide-react'
import { systemItems } from './data/systemItems.js'
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
        <p>O Doydoyd OS foi feito para funcionar sempre deitado, igual um PC.</p>
      </div>

      <div className="desktopContent">
        <div className="systemLabel">
          <span>DOYDOYD OS</span>
          <small>cloud workstation</small>
        </div>

        <div className="scanLine" />

        <div className="iconsGrid">
          {systemItems.map((item) => {
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
              <b>Doydoyd OS</b>
              <span>Sistema pronto para virar seu PC virtual na nuvem.</span>
            </div>
            <div className="quickActions">
              <button>Modo tablet</button>
              <button>Tela cheia</button>
              <button>Modo leve</button>
              <button>Nuvem</button>
            </div>
          </aside>
        )}

        <Taskbar items={systemItems} onOpen={setActiveItem} onToggleActions={() => setActionCenterOpen(!actionCenterOpen)} />
      </div>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
