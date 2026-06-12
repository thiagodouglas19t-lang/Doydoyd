import React from 'react'
import { createRoot } from 'react-dom/client'
import { Bot, FileText, Folder, Maximize2, MessageCircle, Settings, Sparkles } from 'lucide-react'
import './styles.css'
import wallpaper from './assets/tablet-wallpaper.svg'

const apps = [
  { name: 'Editor IA', icon: FileText },
  { name: 'Mini Chat', icon: MessageCircle },
  { name: 'Projetos', icon: Sparkles },
  { name: 'Arquivos', icon: Folder },
  { name: 'Config', icon: Settings },
  { name: 'IA', icon: Bot }
]

function App() {
  const fullscreen = () => document.documentElement.requestFullscreen?.().catch(() => {})
  return (
    <main className="pcDesktop" style={{ backgroundImage: `url(${wallpaper})` }}>
      <button className="fullscreenButton" onClick={fullscreen}><Maximize2 size={14}/> Tela cheia</button>
      <div className="miniIcons">
        {apps.map((app) => {
          const Icon = app.icon
          return <button key={app.name} className="miniIcon"><span><Icon size={18}/></span><small>{app.name}</small></button>
        })}
      </div>
      <footer className="pcTaskbar"><strong>Doydoyd</strong><div></div><span>mini PC</span></footer>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
