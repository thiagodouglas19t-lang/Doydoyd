import { LayoutGrid } from 'lucide-react'
import { Clock } from './Clock.jsx'

export function Taskbar({ items, onOpen }) {
  return (
    <footer className="taskbar">
      <button className="startButton" aria-label="Abrir menu iniciar"><LayoutGrid size={20} /></button>
      <div className="taskSearch">Pesquisar no Doydoyd OS</div>
      <div className="taskApps">
        {items.map((item) => {
          const Icon = item.icon
          return <button key={item.id} onClick={() => onOpen(item)} aria-label={item.name}><Icon size={19} /></button>
        })}
      </div>
      <Clock />
    </footer>
  )
}
