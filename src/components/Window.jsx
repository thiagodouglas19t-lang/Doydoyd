import { SystemPanel } from './SystemPanel.jsx'

export function Window({ item, onClose }) {
  const Icon = item.icon

  return (
    <section className="window">
      <header className="windowHeader">
        <div className="windowTitle"><Icon size={16} /> {item.name}</div>
        <button onClick={onClose} className="closeBtn" aria-label="Fechar janela">×</button>
      </header>
      <div className="windowBody">
        <SystemPanel item={item} />
      </div>
    </section>
  )
}
