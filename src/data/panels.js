import { Cloud, FolderOpen, Monitor, Settings, Shield, Trash2 } from 'lucide-react'

export const panels = {
  home: {
    icon: Monitor,
    title: 'Estação principal online',
    text: 'Base do Doydoyd OS: desktop, janelas, barra, central de ações e estrutura para apps na nuvem.',
    status: ['Desktop ativo', 'Paisagem ativo', 'PWA pronto', 'Núcleo seguro']
  },
  files: {
    icon: FolderOpen,
    title: 'Arquivos da nuvem',
    text: 'Aqui vai ficar o gerenciador de arquivos leve, feito para abrir projetos, notas e links sem pesar o tablet.',
    status: ['Pastas', 'Projetos', 'Notas', 'Links']
  },
  cloud: {
    icon: Cloud,
    title: 'Base da nuvem',
    text: 'Área para login, atalhos, preferências, sincronização e dados leves usando serviços externos.',
    status: ['Login', 'Preferências', 'Atalhos', 'Sincronização']
  },
  cleaner: {
    icon: Trash2,
    title: 'Limpeza semanal',
    text: 'Rotina para organizar coisas antigas do Doydoyd OS sem mexer diretamente no Android.',
    status: ['Links velhos', 'Notas antigas', 'Projetos parados', 'Arquivos grandes']
  },
  settings: {
    icon: Settings,
    title: 'Configurações do sistema',
    text: 'Tema, wallpaper, modo leve, layout, comportamento das janelas e preferências do PC virtual.',
    status: ['Tema escuro', 'Modo leve', 'Wallpaper', 'Layout']
  },
  fallback: {
    icon: Shield,
    title: 'Módulo seguro',
    text: 'Esse módulo ainda não tem painel próprio, então o sistema abriu uma tela segura no lugar.',
    status: ['Sem travar', 'Sem tela branca', 'Fallback ativo', 'Sistema vivo']
  }
}
