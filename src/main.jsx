import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Expand, Sparkles } from 'lucide-react'
import { systemItems } from './data/systemItems.js'
import { Taskbar } from './components/Taskbar.jsx'
import { Window } from './components/Window.jsx'
import './styles.css'

function enterFullscreen() {
  const root = document.documentElement
  if (root.requestFullscreen) root.requestFullscreen().catch(() => {})
}

function App() {
  const [activeItem, setActiveItem] = useState(systemItems[0])

  return (
    <main className="desktop">
      <div className="portraitBlock">
        <Sparkles size={42} />
        <h1>Vire o aparelho</h1>
        <p>O Doydoyd OS foi feito para funcionar sempre deitado, igual um PC.</p>
      </div>

      <div className="desktopContent">
        <div className="brand">
          <span>Doydoyd OS</span>
          <small>Cloud PC base</small>
        </div>

        <button className="fullscreenButton" onClick={enterFullscreen}>
          <Expand size={15} /> Tela cheia
        </button>

        <div className="iconsGrid">
          {systemItems.map((item) => {
            const Icon = item.icon
            return (
              <button key={item.id} className="desktopIcon" onClick={() => setActiveItem(item)}>
                <Icon size={30} />
                <span>{item.name}</span>
              </button>
            )
          })}
        </div>

        {activeItem && <Window item={activeItem} onClose={() => setActiveItem(null)} />}

        <Taskbar items={systemItems} onOpen={setActiveItem} />
      </div>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
