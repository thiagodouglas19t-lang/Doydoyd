import { Sparkles } from 'lucide-react'
import { ActionCenter } from './ActionCenter.jsx'
import { AppButton } from './AppButton.jsx'
import { Taskbar } from './Taskbar.jsx'
import { Window } from './Window.jsx'

export function DesktopShell({ desktop }) {
  return (
    <main className="desktop nasaDesktop">
      <div className="portraitBlock">
        <Sparkles size={42} />
        <h1>Vire o aparelho</h1>
        <p>{desktop.system.orientationMessage}</p>
      </div>

      <div className="desktopContent">
        <div className="systemLabel"><span>{desktop.system.name}</span><small>{desktop.system.tagline}</small></div>
        <div className="scanLine" />
        <div className="iconsGrid">{desktop.apps.map((app) => <AppButton key={app.id} app={app} mode="icon" size={20} onOpen={desktop.openApp} />)}</div>
        {desktop.activeApp && <Window item={desktop.activeApp} onClose={desktop.closeApp} />}
        {desktop.actionCenterOpen && <ActionCenter desktop={desktop} />}
        <Taskbar items={desktop.apps} onOpen={desktop.openApp} onToggleActions={desktop.toggleActions} />
      </div>
    </main>
  )
}
