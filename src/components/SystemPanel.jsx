import { panels } from '../data/panels.js'

export function SystemPanel({ item }) {
  const panel = panels[item.id] || panels.fallback
  const Icon = panel.icon

  return (
    <div className="systemPanel">
      <Icon size={46} />
      <h2>{panel.title}</h2>
      <p>{panel.text}</p>
      <div className="statusGrid">
        {panel.status.map((label) => <span key={label}>{label}</span>)}
      </div>
    </div>
  )
}
