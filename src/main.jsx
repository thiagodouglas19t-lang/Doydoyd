import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Chrome, Folder, NotebookPen, Settings, Trash2, Youtube, MessageCircle, Github, Sparkles, Film, Plus, Play, Scissors, Download } from 'lucide-react'
import './styles.css'

const apps = [
  { id: 'browser', name: 'Navegador', icon: Chrome, url: 'https://www.google.com' },
  { id: 'studio', name: 'Editor', icon: Film },
  { id: 'youtube', name: 'YouTube', icon: Youtube, url: 'https://www.youtube.com' },
  { id: 'discord', name: 'Discord', icon: MessageCircle, url: 'https://discord.com/app' },
  { id: 'github', name: 'GitHub', icon: Github, url: 'https://github.com' },
  { id: 'notes', name: 'Notas', icon: NotebookPen },
  { id: 'files', name: 'Arquivos', icon: Folder },
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

function VideoEditor() {
  const [clips, setClips] = useState([
    { id: 1, name: 'Cena 1', time: '0:00 - 0:05', type: 'Vídeo' },
    { id: 2, name: 'Cena 2', time: '0:05 - 0:12', type: 'Imagem' }
  ])

  function addClip() {
    const next = clips.length + 1
    setClips([...clips, { id: Date.now(), name: `Cena ${next}`, time: 'novo corte', type: 'Mídia' }])
  }

  return (
    <div className="editorApp">
      <aside className="editorSidebar">
        <h2>Doy Studio</h2>
        <button onClick={addClip}><Plus size={16} /> Adicionar cena</button>
        <button><Scissors size={16} /> Cortar</button>
        <button><Play size={16} /> Prévia</button>
        <button><Download size={16} /> Exportar depois</button>
      </aside>

      <section className="previewArea">
        <div className="previewScreen">
          <Film size={44} />
          <strong>Prévia do vídeo</strong>
          <span>Editor leve para organizar cenas, cortes, roteiro e assets.</span>
        </div>
      </section>

      <section className="timeline">
        {clips.map((clip) => (
          <div className="clip" key={clip.id}>
            <strong>{clip.name}</strong>
            <span>{clip.type}</span>
            <small>{clip.time}</small>
          </div>
        ))}
      </section>
    </div>
  )
}

function Window({ app, onClose }) {
  const Icon = app.icon

  return (
    <section className="window">
      <header className="windowHeader">
        <div className="windowTitle"><Icon size={16} /> {app.name}</div>
        <button onClick={onClose} className="closeBtn">×</button>
      </header>

      <div className="windowBody">
        {app.id === 'studio' ? (
          <VideoEditor />
        ) : app.url ? (
          <div className="launcherCard">
            <Icon size={48} />
            <h2>{app.name}</h2>
            <p>Este atalho abre fora do Doydoyd OS para ficar mais leve no tablet.</p>
            <a href={app.url} target="_blank" rel="noreferrer">Abrir {app.name}</a>
          </div>
        ) : app.id === 'notes' ? (
          <textarea className="notes" placeholder="Escreva ideias rápidas aqui. Depois vamos salvar isso no Supabase." />
        ) : app.id === 'cleaner' ? (
          <div className="panelText">
            <h2>Limpeza semanal</h2>
            <p>Área para apagar links velhos, notas inúteis, arquivos temporários e coisas que deixam sua nuvem bagunçada.</p>
            <button>Verificar depois</button>
          </div>
        ) : (
          <div className="panelText">
            <h2>{app.name}</h2>
            <p>Esse app vai ser conectado à nuvem nas próximas versões.</p>
          </div>
        )}
      </div>
    </section>
  )
}

function App() {
  const [activeApp, setActiveApp] = useState(null)

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
          <small>Cloud PC leve</small>
        </div>

        <div className="iconsGrid">
          {apps.map((app) => {
            const Icon = app.icon
            return (
              <button key={app.id} className="desktopIcon" onClick={() => setActiveApp(app)}>
                <Icon size={30} />
                <span>{app.name}</span>
              </button>
            )
          })}
        </div>

        {activeApp && <Window app={activeApp} onClose={() => setActiveApp(null)} />}

        <footer className="taskbar">
          <button className="startButton">⊞</button>
          <div className="taskSearch">Pesquisar no Doydoyd OS</div>
          <div className="taskApps">
            {apps.slice(0, 5).map((app) => {
              const Icon = app.icon
              return <button key={app.id} onClick={() => setActiveApp(app)}><Icon size={19} /></button>
            })}
          </div>
          <Clock />
        </footer>
      </div>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
