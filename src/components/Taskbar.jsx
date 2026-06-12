import { Battery, ChevronUp, LayoutGrid, Maximize2, Search, Volume2, Wifi } from 'lucide-react'
import { Clock } from './Clock.jsx'

function enterFullscreen() {
  const root = document.documentElement
  if (root.requestFullscreen) root.requestFullscreen().catch(() => {})
}

export function Taskbar({ items, onOpen }) {
  return (
    <footer className="taskbar">
      <div className="taskbarCenter">
        <button className="startButton" aria-label="Abrir menu iniciar"><LayoutGrid size={17} /></button>
        <button className="taskIcon" aria-label="Pesquisar"><Search size={16} /></button>
        {items.map((item) => {
          const Icon = item.icon
          return <button className="taskIcon" key={item.id} onClick={() => onOpen(item)} aria-label={item.name}><Icon size={17} /></button>
        })}
      </div>

      <div className="systemTray">
        <button onClick={enterFullscreen} aria-label="Tela cheia"><Maximize2 size={13} /></button>
        <ChevronUp size={12} />
        <Wifi size={13} />
        <Volume2 size={13} />
        <Battery size={14} />
        <Clock />
      </div>
    </footer>
  )
}
