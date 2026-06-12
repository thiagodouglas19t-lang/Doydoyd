import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Bot, Download, FileText, Folder, Maximize2, MessageCircle, Play, Settings, Sparkles, Upload, Wand2, X } from 'lucide-react'
import './styles.css'
import wallpaper from './assets/tablet-wallpaper.svg'

const apps = [
  { id: 'editor', name: 'Editor IA', icon: FileText },
  { id: 'chat', name: 'Mini Chat', icon: MessageCircle },
  { id: 'projects', name: 'Projetos', icon: Sparkles },
  { id: 'files', name: 'Arquivos', icon: Folder },
  { id: 'settings', name: 'Config', icon: Settings },
  { id: 'ai', name: 'IA', icon: Bot }
]

function ShortsEditor() {
  const [title, setTitle] = useState('Meu Short')
  const [script, setScript] = useState('')
  const prompt = `Crie um short vertical 9:16 sobre: ${title}\nVisual realista, cortes rápidos, sem enrolação.`
  return <div className="shortsEditor"><section><h2>Editor de Shorts</h2><input value={title} onChange={(e) => setTitle(e.target.value)} /><textarea value={script} onChange={(e) => setScript(e.target.value)} placeholder="Roteiro, falas, cenas, ideias..." /><div className="editorActions"><button><Play size={15}/> Preview</button><button onClick={() => setScript(prompt)}><Wand2 size={15}/> IA cria base</button><button><Download size={15}/> Exportar</button></div></section><aside><strong>Linha do tempo</strong><div className="timeline"><span>Cena 1</span><span>Cena 2</span><span>Cena 3</span></div><strong>Prompt IA</strong><pre>{prompt}</pre></aside></div>
}

function MediaChat() {
  return <div className="mediaChat"><h2>Mini Chat de mídia</h2><p>Use esse app para mandar imagem e vídeo para o tablet e organizar o material dos Shorts.</p><label className="dropBox"><Upload size={30}/><span>Selecionar imagem ou vídeo</span><input type="file" accept="image/*,video/*" multiple /></label><div className="mediaNote">Próximo passo: salvar os arquivos em uma lista e mostrar miniaturas aqui.</div></div>
}

function AIHelper() {
  return <div className="aiHelper"><h2>IA dos Shorts</h2><button>Gerar roteiro</button><button>Gerar prompts de imagem</button><button>Criar ideias virais</button><p>A IA real entra depois pela chave da OpenAI. Agora a tela já está preparada.</p></div>
}

function AppWindow({ app, onClose }) {
  const Icon = app.icon
  return <section className="appWindow"><header><div><Icon size={16}/>{app.name}</div><button onClick={onClose}><X size={16}/></button></header><main>{app.id === 'editor' ? <ShortsEditor /> : app.id === 'chat' ? <MediaChat /> : app.id === 'ai' ? <AIHelper /> : <div className="placeholder"><Icon size={44}/><h2>{app.name}</h2><p>Esse app vai entrar depois.</p></div>}</main></section>
}

function App() {
  const [active, setActive] = useState(null)
  const fullscreen = () => document.documentElement.requestFullscreen?.().catch(() => {})
  return <main className="pcDesktop" style={{ backgroundImage: `url(${wallpaper})` }}><button className="fullscreenButton" onClick={fullscreen}><Maximize2 size={14}/> Tela cheia</button><div className="miniIcons">{apps.map((app) => { const Icon = app.icon; return <button key={app.id} className="miniIcon" onClick={() => setActive(app)}><span><Icon size={18}/></span><small>{app.name}</small></button> })}</div>{active && <AppWindow app={active} onClose={() => setActive(null)} />}<footer className="pcTaskbar"><strong>Doydoyd</strong><div></div><span>shorts studio</span></footer></main>
}

createRoot(document.getElementById('root')).render(<App />)
