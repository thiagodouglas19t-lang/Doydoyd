import { Battery, Bell, ChevronUp, Maximize2, Power, Search, Settings, User, Volume2, Wifi } from 'lucide-react'
import { useState } from 'react'
import { Clock } from './Clock.jsx'

function enterFullscreen() {
  const root = document.documentElement
  if (root.requestFullscreen) root.requestFullscreen().catch(() => {})
}

export function Taskbar({ items, onOpen, onToggleActions }) {
  const [startOpen, setStartOpen] = useState(false)

  function openItem(item) {
    onOpen(item)
    setStartOpen(false)
  }

  return (
    <>
      {startOpen && (
        <section className="startMenu">
          <aside className="startRail">
            <button aria-label="Menu">☰</button>
            <button aria-label="Usuário"><User size={15} /></button>
            <button aria-label="Configurações"><Settings size={15} /></button>
            <button aria-label="Energia"><Power size={15} /></button>
          </aside>
          <div className="startAppsList">
            <strong>Sistema</strong>
            {items.map((item) => {
              const Icon = item.icon
              return (
                <button key={item.id} onClick={() => openItem(item)}>
                  <Icon size={16} />
                  <span>{item.name}</span>
                </button>
              )
            })}
          </div>
          <div className="startTiles">
            {items.slice(0, 4).map((item) => {
              const Icon = item.icon
              return (
                <button key={item.id} onClick={() => openItem(item)}>
                  <Icon size={22} />
                  <span>{item.name}</span>
                </button>
              )
            })}
          </div>
        </section>
      )}

      <footer className="taskbar">
        <div className="taskbarLeft">
          <button className="startButton" onClick={() => setStartOpen(!startOpen)} aria-label="Abrir menu iniciar">⊞</button>
          <div className="win10Search"><Search size={14} /> Pesquisar</div>
          {items.slice(0, 3).map((item) => {
            const Icon = item.icon
            return <button className="taskIcon" key={item.id} onClick={() => openItem(item)} aria-label={item.name}><Icon size={17} /></button>
          })}
        </div>

        <div className="systemTray">
          <button onClick={enterFullscreen} aria-label="Tela cheia"><Maximize2 size={13} /></button>
          <ChevronUp size={12} />
          <Wifi size={13} />
          <Volume2 size={13} />
          <Battery size={14} />
          <Clock />
          <button onClick={onToggleActions} aria-label="Central de ações"><Bell size={13} /></button>
        </div>
      </footer>
    </>
  )
}
