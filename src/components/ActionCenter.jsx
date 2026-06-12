import { Bell } from 'lucide-react'

export function ActionCenter({ desktop }) {
  return (
    <aside className="actionCenter">
      <header><strong>Central de ações</strong><Bell size={15} /></header>
      <div className="notificationCard">
        <b>{desktop.system.name}</b>
        <span>Sistema pronto para virar seu PC virtual na nuvem.</span>
      </div>
      <div className="quickActions">
        {desktop.quickActions.map((action) => <button key={action}>{action}</button>)}
      </div>
    </aside>
  )
}
