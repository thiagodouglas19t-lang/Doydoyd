import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Battery, Folder, HardDrive, Maximize2, Monitor, Power, Settings, Shield, Volume2, Wifi } from 'lucide-react'
import './styles.css'

const apps = [
  ['pc', 'Este PC', Monitor, 'Simulador de computador leve rodando direto no navegador.', ['Sistema online', 'Modo navegador', 'Tela adaptada', 'Baixo consumo']],
  ['files', 'Arquivos', Folder, 'Pastas visuais para organizar o PC.', ['Desktop', 'Downloads', 'Projetos', 'Favoritos']],
  ['settings', 'Configurações', Settings, 'Ajustes rápidos do simulador.', ['Tela cheia', 'Modo escuro', 'Layout PC', 'Leve no tablet']],
  ['security', 'Segurança', Shield, 'Status de proteção do sistema.', ['Sem instalação', 'Sem permissão extra', 'Controle local', 'Navegação segura']],
  ['storage', 'Disco', HardDrive, 'Resumo visual do armazenamento.', ['Sistema: 2 GB', 'Livre: 28 GB', 'Cache limpo', 'Nuvem opcional']]
].map(([id, name, icon, text, status]) => ({ id, name, icon, text, status }))

function IconButton({ app, mode, onClick }) {
  const Icon = app.icon
  if (mode === 'desktop') return <button className="desktopIcon" onClick={onClick}><span className="iconPlate"><Icon size={22} /></span><span>{app.name}</span></button>
  if (mode === 'menu') return <button onClick={onClick}><Icon size={16} />{app.name}</button>
  return <button className="taskIcon" onClick={onClick}><Icon size={17} /></button>
}

function Window({ app, maximized, toggleMaximize, close }) {
  const Icon = app.icon
  return (
    <section className={`window ${maximized ? 'maximized' : ''}`}>
      <header className="windowHeader">
        <div className="windowTitle"><Icon size={16} />{app.name}</div>
        <div className="windowControls"><button onClick={toggleMaximize}>{maximized ? '❐' : '□'}</button><button className="closeBtn" onClick={close}>×</button></div>
      </header>
      <div className="windowBody systemPanel">
        <Icon size={50} />
        <h2>{app.name}</h2>
        <p>{app.text}</p>
        <div className="statusGrid">{app.status.map((item) => <span key={item}>{item}</span>)}</div>
      </div>
    </section>
  )
}

function App() {
  const [activeId, setActiveId] = useState('pc')
  const [menu, setMenu] = useState(false)
  const [center, setCenter] = useState(false)
  const [maximized, setMaximized] = useState(false)
  const activeApp = useMemo(() => apps.find((app) => app.id === activeId), [activeId])
  const open = (id) => { setActiveId(id); setMenu(false) }
  const fullscreen = () => document.documentElement.requestFullscreen?.().catch(() => {})

  return (
    <main className="desktop">
      <div className="desktopContent">
        <button className="fullscreenButton" onClick={fullscreen}><Maximize2 size={15} /> Tela cheia</button>
        <div className="systemLabel"><span>DOYDOYD PC</span><small>mini board simulator</small></div>
        <div className="boardBadge">mini placa • leve • estável</div>
        <div className="iconsGrid">{apps.map((app) => <IconButton key={app.id} app={app} mode="desktop" onClick={() => open(app.id)} />)}</div>
        {activeApp && <Window app={activeApp} maximized={maximized} toggleMaximize={() => setMaximized(!maximized)} close={() => setActiveId(null)} />}
        {menu && <section className="startMenu simpleMenu"><strong>Apps do sistema</strong>{apps.map((app) => <IconButton key={app.id} app={app} mode="menu" onClick={() => open(app.id)} />)}</section>}
        {center && <aside className="actionCenter"><header><strong>Central</strong><Wifi size={15} /></header><button className="focusAction" onClick={fullscreen}>Entrar em tela cheia</button><div className="notificationCard"><b>Doydoyd PC</b><span>Simulador limpo, leve e focado em parecer um PC no tablet.</span></div></aside>}
        <footer className="taskbar">
          <div className="taskbarLeft"><button className="startButton" onClick={() => setMenu(!menu)}>⊞</button>{apps.slice(0, 4).map((app) => <IconButton key={app.id} app={app} mode="task" onClick={() => open(app.id)} />)}</div>
          <div className="systemTray"><button onClick={fullscreen}><Monitor size={13} /></button><Wifi size={13} /><Volume2 size={13} /><Battery size={14} /><button onClick={() => setCenter(!center)}><Power size={13} /></button></div>
        </footer>
      </div>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
