import { Bell } from 'lucide-react'

function runAction(action) {
  if (action.id === 'fullscreen') {
    document.documentElement.requestFullscreen?.().catch(() => {})
  }
}

export function ActionCenter({ desktop }) {
  return (
    <aside className="actionCenter">
      <header><strong>Central de ações</strong><Bell size={15} /></header>
      <button className="focusAction" onClick={() => runAction({ id: 'fullscreen' })}>Entrar em tela cheia</button>
      <div className="notificationCard">
        <b>{desktop.system.name}</b>
        <span>Use tela cheia para esconder a barra do navegador e deixar com cara de PC.</span>
      </div>
      <div className="quickActions">
        {desktop.quickActions.map((action) => {
          const Icon = action.icon
          return <button key={action.id} onClick={() => runAction(action)}><Icon size={14} />{action.label}</button>
        })}
      </div>
    </aside>
  )
}
