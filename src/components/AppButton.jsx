export function AppButton({ app, mode = 'icon', size = 18, onOpen }) {
  const Icon = app.icon
  const className = mode === 'task' ? 'taskIcon' : mode === 'tile' ? 'tileButton' : mode === 'list' ? 'listButton' : 'desktopIcon'

  return (
    <button className={className} onClick={() => onOpen(app)} aria-label={app.name}>
      {mode === 'icon' ? <span className="iconPlate"><Icon size={size} /></span> : <Icon size={size} />}
      {mode !== 'task' && <span>{app.name}</span>}
    </button>
  )
}
