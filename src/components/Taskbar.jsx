import { Battery, Bell, ChevronUp, Maximize2, Power, Search, Settings, User, Volume2, Wifi } from 'lucide-react'
import { useState } from 'react'
import { getPinnedApps } from '../system/core.js'
import { AppButton } from './AppButton.jsx'
import { Clock } from './Clock.jsx'

function enterFullscreen() {
  const root = document.documentElement
  if (root.requestFullscreen) root.requestFullscreen().catch(() => {})
}

export function Taskbar({ items, onOpen, onToggleActions }) {
  const [startOpen, setStartOpen] = useState(false)
  const pinnedApps = getPinnedApps()
  const tileApps = items.slice(0, 4)

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
            {items.map((app) => <AppButton key={app.id} app={app} mode="list" size={16} onOpen={openItem} />)}
          </div>

          <div className="startTiles">
            {tileApps.map((app) => <AppButton key={app.id} app={app} mode="tile" size={22} onOpen={openItem} />)}
          </div>
        </section>
      )}

      <footer className="taskbar">
        <div className="taskbarLeft">
          <button className="startButton" onClick={() => setStartOpen(!startOpen)} aria-label="Abrir menu iniciar">⊞</button>
          <div className="win10Search"><Search size={14} /> Pesquisar</div>
          {pinnedApps.map((app) => <AppButton key={app.id} app={app} mode="task" onOpen={openItem} />)}
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
