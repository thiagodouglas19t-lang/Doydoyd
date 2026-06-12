import { useMemo, useState } from 'react'
import { APPS, quickActions, SYSTEM } from './core.js'

export function useDesktop() {
  const [activeApp, setActiveApp] = useState(APPS[0])
  const [panel, setPanel] = useState(null)

  const desktop = useMemo(() => ({
    system: SYSTEM,
    apps: APPS,
    quickActions,
    activeApp,
    actionCenterOpen: panel === 'actions',
    openApp: setActiveApp,
    closeApp: () => setActiveApp(APPS[0]),
    toggleActions: () => setPanel((value) => value === 'actions' ? null : 'actions')
  }), [activeApp, panel])

  return desktop
}
