import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Bot, FileText, Maximize2, MessageCircle, Plus, Save, Sparkles } from 'lucide-react'
import './styles.css'

const apps = [
  { id: 'editor', name: 'Editor IA', icon: FileText },
  { id: 'chat', name: 'Mini Chat', icon: MessageCircle },
  { id: 'projects', name: 'Projetos', icon: Sparkles }
]

function askLocalAI(text, mode) {
  if (!text.trim()) return 'Escreve alguma coisa primeiro.'
  if (mode === 'resumir') return `Resumo rápido:\n\n${text.split(/[.!?]/).filter(Boolean).slice(0, 2).join('. ')}.`
  if (mode === 'roteiro') return `Roteiro base:\n\n1. Gancho forte\n2. Explicação direta\n3. Exemplo visual\n4. Fechamento com aprendizado\n\nTexto base:\n${text}`
  return `Versão melhorada:\n\n${text.trim()}\n\nAjuste: deixe mais claro, direto e com começo forte.`
}

function EditorAI() {
  const [text, setText] = useState(() => localStorage.getItem('doydoyd-editor') || '')
  const [result, setResult] = useState('')
  useEffect(() => localStorage.setItem('doydoyd-editor', text), [text])
  return <div className="appView editorView"><textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Escreve roteiro, ideia, prompt ou anotação aqui..." /><aside><h2>Editor IA</h2><p>Modo leve: já organiza texto localmente. Depois conectamos IA real pela API.</p><button onClick={() => setResult(askLocalAI(text, 'melhorar'))}><Sparkles size={15}/> Melhorar</button><button onClick={() => setResult(askLocalAI(text, 'resumir'))}><Save size={15}/> Resumir</button><button onClick={() => setResult(askLocalAI(text, 'roteiro'))}><FileText size={15}/> Criar roteiro</button><pre>{result || 'O resultado aparece aqui.'}</pre></aside></div>
}

function MiniChat() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(() => JSON.parse(localStorage.getItem('doydoyd-chat') || '[]'))
  useEffect(() => localStorage.setItem('doydoyd-chat', JSON.stringify(messages)), [messages])
  function send() {
    if (!input.trim()) return
    const reply = `Entendi. Ideia salva: ${input.trim()}\n\nQuando a IA real entrar, eu respondo melhor aqui.`
    setMessages([...messages, { from: 'Você', text: input }, { from: 'Doydoyd', text: reply }])
    setInput('')
  }
  return <div className="appView chatView"><div className="chatLog">{messages.length ? messages.map((m, i) => <div key={i} className={m.from === 'Você' ? 'msg user' : 'msg'}><b>{m.from}</b><span>{m.text}</span></div>) : <p className="empty">Mini chat básico pronto.</p>}</div><div className="chatBar"><input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} placeholder="Fala com o mini chat..." /><button onClick={send}>Enviar</button></div></div>
}

function Projects() {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('doydoyd-projects') || '["Short sobre espaço", "Configurar tablet", "Criar app leve"]'))
  useEffect(() => localStorage.setItem('doydoyd-projects', JSON.stringify(items)), [items])
  return <div className="appView projectView"><h2>Projetos</h2><button onClick={() => setItems([...items, 'Novo projeto'])}><Plus size={15}/> Novo</button>{items.map((item, i) => <input key={i} value={item} onChange={(e) => setItems(items.map((v, x) => x === i ? e.target.value : v))} />)}</div>
}

function AppContent({ id }) {
  if (id === 'chat') return <MiniChat />
  if (id === 'projects') return <Projects />
  return <EditorAI />
}

function App() {
  const [active, setActive] = useState('editor')
  const current = apps.find((app) => app.id === active)
  const Icon = current.icon
  const fullscreen = () => document.documentElement.requestFullscreen?.().catch(() => {})
  return <main className="hub"><header className="topbar"><strong>Doydoyd Hub</strong><button onClick={fullscreen}><Maximize2 size={15}/> Tela cheia</button></header><aside className="dock">{apps.map((app) => { const I = app.icon; return <button key={app.id} className={active === app.id ? 'active' : ''} onClick={() => setActive(app.id)}><I size={20}/><span>{app.name}</span></button> })}</aside><section className="window"><header className="windowHeader"><div className="windowTitle"><Icon size={16}/>{current.name}</div><Bot size={16}/></header><div className="windowBody"><AppContent id={active}/></div></section></main>
}

createRoot(document.getElementById('root')).render(<App />)
