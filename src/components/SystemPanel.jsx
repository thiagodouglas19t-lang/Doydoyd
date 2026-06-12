import { Cloud, Monitor, Shield, Trash2 } from 'lucide-react'

export function SystemPanel({ item }) {
  if (item.id === 'home') {
    return (
      <div className="systemPanel">
        <Monitor size={46} />
        <h2>Seu PC virtual está começando</h2>
        <p>Agora o foco é deixar a base pronta: desktop, janelas, barra de tarefas, modo paisagem e estrutura para apps futuros.</p>
        <div className="statusGrid">
          <span>Desktop: ativo</span>
          <span>Modo paisagem: ativo</span>
          <span>Apps internos: depois</span>
          <span>Nuvem: próxima etapa</span>
        </div>
      </div>
    )
  }

  if (item.id === 'cloud') {
    return (
      <div className="systemPanel">
        <Cloud size={46} />
        <h2>Base da nuvem</h2>
        <p>Essa área vai guardar login, atalhos, configurações, arquivos leves e preferências usando Supabase.</p>
        <div className="statusGrid">
          <span>Login</span>
          <span>Configurações</span>
          <span>Atalhos</span>
          <span>Arquivos leves</span>
        </div>
      </div>
    )
  }

  if (item.id === 'cleaner') {
    return (
      <div className="systemPanel">
        <Trash2 size={46} />
        <h2>Limpeza semanal</h2>
        <p>Depois vamos criar uma rotina para limpar coisas antigas da nuvem do Doydoyd OS, sem mexer diretamente no Android.</p>
        <div className="statusGrid">
          <span>Links velhos</span>
          <span>Notas antigas</span>
          <span>Projetos parados</span>
          <span>Arquivos grandes</span>
        </div>
      </div>
    )
  }

  return (
    <div className="systemPanel">
      <Shield size={46} />
      <h2>Configurações do sistema</h2>
      <p>Aqui vão ficar tema, wallpaper, modo leve para tablet fraco, atalhos e preferências do PC virtual.</p>
      <div className="statusGrid">
        <span>Tema escuro</span>
        <span>Modo leve</span>
        <span>Wallpaper</span>
        <span>Layout</span>
      </div>
    </div>
  )
}
