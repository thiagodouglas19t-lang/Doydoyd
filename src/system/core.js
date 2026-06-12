import { Cloud, FolderOpen, Maximize2, Monitor, Settings, Trash2 } from 'lucide-react'

export const SYSTEM = {
  name: 'DOYDOYD OS',
  tagline: 'cloud workstation',
  orientationMessage: 'O Doydoyd OS foi feito para funcionar sempre deitado, igual um PC.'
}

export const APPS = [
  { id: 'home', name: 'Este PC', icon: Monitor, pinned: true },
  { id: 'files', name: 'Arquivos', icon: FolderOpen, pinned: true },
  { id: 'cloud', name: Cloud ? 'Nuvem' : 'Nuvem', icon: Cloud, pinned: true },
  { id: 'cleaner', name: 'Limpeza', icon: Trash2, pinned: false },
  { id: 'settings', name: 'Configurações', icon: Settings, pinned: false }
]

export const quickActions = [
  { id: 'fullscreen', label: 'Tela cheia', icon: Maximize2 },
  { id: 'light', label: 'Modo leve', icon: Monitor },
  { id: 'cloud', label: 'Nuvem', icon: Cloud }
]

export const getPinnedApps = () => APPS.filter((app) => app.pinned)
export const getAppById = (id) => APPS.find((app) => app.id === id) || APPS[0]
