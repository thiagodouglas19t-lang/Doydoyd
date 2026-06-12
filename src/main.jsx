import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Monitor, Settings, Trash2, Sparkles, Cloud, Shield, LayoutGrid } from 'lucide-react'
import './styles.css'

const systemItems = [
  { id: 'home', name: 'Meu PC', icon: Monitor },
  { id: 'cloud', name: 'Nuvem', icon: Cloud },
  { id: 'cleaner', name: 'Limpeza', icon: Trash2 },
  { id: 'settings', name: 'Configurações', icon: Settings }
]

function Clock() {
  const now = useMemo(() => new Date(), [])
  return (
    <div className="clock">
      <strong>{now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</strong>
      <span>{now.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' })}</span>
    </div>
  )
}

function SystemPanel({ item }) {
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

function Window({ item, onClose }) {
  const Icon = item.icon

  return (
    <section className="window">
      <header className="windowHeader">
        <div className="windowTitle"><Icon size={16} /> {item.name}</div>
        <button onClick={onClose} className="closeBtn">×</button>
      </header>
      <div className="windowBody">
        <SystemPanel item={item} />
      </div>
    </section>
  )
}

function App() {
  const [activeItem, setActiveItem] = useState(systemItems[0])

  return (
    <main className="desktop">
      <div className="portraitBlock">
        <Sparkles size={42} />
        <h1>Vire o aparelho</h1>
        <p>O Doydoyd OS foi feito para funcionar sempre deitado, igual um PC.</p>
      </div>

      <div className="desktopContent">
        <div className="brand">
          <span>Doydoyd OS</span>
          <small>Cloud PC base</small>
        </div>

        <div className="iconsGrid">
          {systemItems.map((item) => {
            const Icon = item.icon
            return (
              <button key={item.id} className="desktopIcon" onClick={() => setActiveItem(item)}>
                <Icon size={30} />
                <span>{item.name}</span>
              </button>
            )
          })}
        </div>

        {activeItem && <Window item={activeItem} onClose={() => setActiveItem(null)} />}

        <footer className="taskbar">
          <button className="startButton"><LayoutGrid size={20} /></button>
          <div className="taskSearch">Pesquisar no Doydoyd OS</div>
          <div className="taskApps">
            {systemItems.map((item) => {
              const Icon = item.icon
              return <button key={item.id} onClick={() => setActiveItem(item)}><Icon size={19} /></button>
            })}
          </div>
          <Clock />
        </footer>
      </div>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
