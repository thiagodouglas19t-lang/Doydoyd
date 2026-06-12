import { Cloud, Maximize2, Monitor, Settings } from 'lucide-react'

export const SYSTEM = {
  name: 'DOYDOYD OS',
  tagline: 'browser workstation',
  orientationMessage: 'O Doydoyd OS foi feito para funcionar sempre deitado, igual um PC.'
}

export const APPS = [
  { id: 'browser', name: 'Navegador', icon: Monitor, pinned: true },
  { id: 'cloud', name: 'Nuvem', icon: Cloud, pinned: true },
  { id: 'settings', name: 'Configurações', icon: Settings, pinned: true }
]

export const quickActions = [
  { id: 'fullscreen', label: 'Tela cheia', icon: Maximize2 },
  { id: 'browser', label: 'Navegador', icon: Monitor },
  { id: 'cloud', label: 'Nuvem', icon: Cloud }
]

export const getPinnedApps = () => APPS.filter((app) => app.pinned)
export const getAppById = (id) => APPS.find((app) => app.id === id) || APPS[0]
