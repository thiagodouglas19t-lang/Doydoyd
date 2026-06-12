import { Monitor, Settings, Trash2, Cloud } from 'lucide-react'

export const systemItems = [
  {
    id: 'home',
    name: 'Meu PC',
    icon: Monitor,
    description: 'Resumo do sistema, status e atalhos principais.'
  },
  {
    id: 'cloud',
    name: 'Nuvem',
    icon: Cloud,
    description: 'Login, arquivos leves, configurações e sincronização.'
  },
  {
    id: 'cleaner',
    name: 'Limpeza',
    icon: Trash2,
    description: 'Rotina semanal para manter a nuvem leve e organizada.'
  },
  {
    id: 'settings',
    name: 'Configurações',
    icon: Settings,
    description: 'Tema, wallpaper, modo leve, layout e preferências.'
  }
]
