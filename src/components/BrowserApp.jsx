import { ExternalLink, Plus, Search, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '../system/supabase.js'

const fallbackBookmarks = [
  { title: 'YouTube', url: 'https://www.youtube.com' },
  { title: 'Discord Web', url: 'https://discord.com/app' },
  { title: 'CapCut Web', url: 'https://www.capcut.com/editor' },
  { title: 'Google', url: 'https://www.google.com' }
]

function normalizeUrl(value) {
  const text = value.trim()
  if (!text) return ''
  if (text.includes('.') && !text.includes(' ')) return text.startsWith('http') ? text : `https://${text}`
  return `https://www.google.com/search?q=${encodeURIComponent(text)}`
}

async function saveHistory(url, title = 'Navegação') {
  await supabase.from('browser_history').insert({ owner_key: 'local', title, url })
}

export function BrowserApp() {
  const [query, setQuery] = useState('')
  const [bookmarks, setBookmarks] = useState(fallbackBookmarks)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('browser_bookmarks')
      .select('title,url,position')
      .eq('owner_key', 'local')
      .order('position')
      .then(({ data }) => {
        if (data?.length) setBookmarks(data)
        setLoading(false)
      })
  }, [])

  function openUrl(url, title) {
    window.open(url, '_blank', 'noopener,noreferrer')
    saveHistory(url, title)
  }

  async function addBookmark() {
    const url = normalizeUrl(query)
    if (!url) return
    const title = query.trim()
    const next = { title, url, position: bookmarks.length + 1 }
    setBookmarks((items) => [...items, next])
    await supabase.from('browser_bookmarks').insert({ owner_key: 'local', ...next })
  }

  function search(event) {
    event.preventDefault()
    const url = normalizeUrl(query)
    if (url) openUrl(url, query || url)
  }

  return (
    <section className="browserApp">
      <form className="browserSearch" onSubmit={search}>
        <Search size={16} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Pesquisar ou digitar site" autoFocus />
        <button type="submit">Abrir</button>
        <button type="button" onClick={addBookmark} aria-label="Salvar favorito"><Plus size={15} /></button>
      </form>

      <div className="browserHero">
        <strong>Doydoyd Browser</strong>
        <span>{loading ? 'Carregando nuvem...' : 'Teu navegador central: abre sites reais e salva favoritos.'}</span>
      </div>

      <div className="bookmarkGrid">
        {bookmarks.map((bookmark) => (
          <button key={bookmark.url} onClick={() => openUrl(bookmark.url, bookmark.title)}>
            <Star size={16} />
            <span>{bookmark.title}</span>
            <ExternalLink size={13} />
          </button>
        ))}
      </div>
    </section>
  )
}
