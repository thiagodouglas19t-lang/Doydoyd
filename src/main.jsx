import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Battery, Folder, HardDrive, Monitor, Power, Settings, Shield, Volume2, Wifi } from 'lucide-react'
import './styles.css'

const apps = [
  { id: 'pc', name: 'Este PC', icon: Monitor },
  { id: 'files', name: 'Arquivos', icon: Folder },
  { id: 'settings', name: 'Configurações', icon: Settings },
  { id: 'security', name: 'Segurança', icon: Shield },
  { id: 'storage', name: 'Disco', icon: HardDrive }
]

const panels = {
  pc: ['Este PC', 'Simulador de computador leve rodando direto no navegador.', ['Sistema online', 'Modo navegador', 'Tela adaptada', 'Sem apps pesados']],
  files: ['Arquivos', 'Área visual para organizar pastas, projetos e atalhos.', ['Desktop', 'Downloads', 'Projetos', 'Favoritos']],
  settings: ['Configurações', 'Ajustes visuais do simulador de PC.', ['Tela cheia', 'Modo escuro', 'Layout PC', 'Desempenho leve']],
  security: ['Segurança', 'Painel visual de proteção e status do sistema.', ['Navegação segura', 'Sem instalação', 'Sem permissões extras', 'Controle local']],
  storage: ['Disco', 'Resumo visual do armazenamento do sistema.', ['Sistema: 2 GB', 'Livre: 28 GB', 'Cache limpo', 'Nuvem opcional']]
}

function Window({ app, onClose }) {
  const Icon = app.icon
  const [title, text, items] = panels[app.id]
  return (
    <section className="window">
      <header className="windowHeader">
        <div className="windowTitle"><Icon size={16} />{title}</div>
        <button className="closeBtn" onClick={onClose}>×</button>
      </header>
      <div className="windowBody systemPanel">
        <Icon size={48} />
        <h2>{title}</h2>
        <p>{text}</p>
        <div className="statusGrid">{items.map((item) => <span key={item}>{item}</span>)}</div>
      </div>
    </section>
  )
}

function App() {
  const [activeApp, setActiveApp] = useState(apps[0])
  const [startOpen, setStartOpen] = useState(false)
  const [centerOpen, setCenterOpen] = useState(false)

  function fullscreen() {
    document.documentElement.requestFullscreen?.().catch(() => {})
  }

  return (
    <main className="desktop">
      <div className="desktopContent">
        <div className="systemLabel"><span>DOYDOYD PC</span><small>simulador leve</small></div>
        <div className="iconsGrid">
          {apps.map((app) => {
            const Icon = app.icon
            return <button key={app.id} className="desktopIcon" onClick={() => setActiveApp(app)}><span className="iconPlate"><Icon size={22} /></span><span>{app.name}</span></button>
          })}
        </div>

        {activeApp && <Window app={activeApp} onClose={() => setActiveApp(null)} />}

        {startOpen && (
          <section className="startMenu simpleMenu">
            <strong>Apps do sistema</strong>
            {apps.map((app) => {
              const Icon = app.icon
              return <button key={app.id} onClick={() => { setActiveApp(app); setStartOpen(false) }}><Icon size={16} />{app.name}</button>
            })}
          </section>
        )}

        {centerOpen && (
          <aside className="actionCenter">
            <header><strong>Central</strong><Wifi size={15} /></header>
            <button className="focusAction" onClick={fullscreen}>Entrar em tela cheia</button>
            <div className="notificationCard"><b>Doydoyd PC</b><span>Simulador limpo, leve e pronto para testar no tablet.</span></div>
          </aside>
        )}

        <footer className="taskbar">
          <div className="taskbarLeft">
            <button className="startButton" onClick={() => setStartOpen(!startOpen)}>⊞</button>
            {apps.slice(0, 4).map((app) => { const Icon = app.icon; return <button key={app.id} className="taskIcon" onClick={() => setActiveApp(app)}><Icon size={17} /></button> })}
          </div>
          <div className="systemTray">
            <button onClick={fullscreen}><Monitor size={13} /></button>
            <Wifi size={13} /><Volume2 size={13} /><Battery size={14} />
            <button onClick={() => setCenterOpen(!centerOpen)}><Power size={13} /></button>
          </div>
        </footer>
      </div>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
