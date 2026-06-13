import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const W = 960
const H = 540
const clamp = (n, a, b) => Math.max(a, Math.min(b, n))
const random = (a, b) => a + Math.random() * (b - a)

function makeItems() {
  return Array.from({ length: 18 }, (_, i) => ({
    z: 700 + i * 460,
    lane: random(-260, 260),
    type: Math.random() > 0.45 ? 'fuel' : 'part'
  }))
}

function makeRocks() {
  return Array.from({ length: 22 }, (_, i) => ({
    z: 500 + i * 330,
    lane: random(-310, 310),
    size: random(15, 31)
  }))
}

function Game() {
  const canvasRef = useRef(null)
  const keys = useRef({})
  const game = useRef(null)
  const [hud, setHud] = useState({ fuel: 100, hp: 100, km: '0.0', parts: 0, speed: 0, msg: 'WASD ou setas para dirigir' })

  useEffect(() => {
    const down = (e) => { keys.current[e.key.toLowerCase()] = true }
    const up = (e) => { keys.current[e.key.toLowerCase()] = false }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)

    game.current = {
      carX: 0,
      speed: 0,
      fuel: 100,
      hp: 100,
      parts: 0,
      km: 0,
      world: 0,
      items: makeItems(),
      rocks: makeRocks(),
      shake: 0,
      lastHit: 0
    }

    let raf = 0
    const draw = () => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      const g = game.current
      const k = keys.current
      const alive = g.fuel > 0 && g.hp > 0

      if (alive) {
        if (k.w || k.arrowup) g.speed += 0.17
        if (k.s || k.arrowdown) g.speed -= 0.22
        g.speed *= 0.985
        g.speed = clamp(g.speed, 0, 9.3)
        if (k.a || k.arrowleft) g.carX -= 4.7 + g.speed * 0.28
        if (k.d || k.arrowright) g.carX += 4.7 + g.speed * 0.28
        g.carX = clamp(g.carX, -345, 345)
        g.world += g.speed
        g.km += g.speed * 0.004
        g.fuel = clamp(g.fuel - g.speed * 0.006 - ((k.w || k.arrowup) ? 0.018 : 0), 0, 100)
      } else {
        g.speed *= 0.94
      }

      const hitFlash = g.lastHit > 0 ? g.lastHit / 12 : 0
      g.lastHit = Math.max(0, g.lastHit - 1)
      g.shake *= 0.8

      ctx.save()
      ctx.translate(random(-g.shake, g.shake), random(-g.shake, g.shake))
      ctx.clearRect(-20, -20, W + 40, H + 40)

      const sky = ctx.createLinearGradient(0, 0, 0, H)
      sky.addColorStop(0, '#0b1930')
      sky.addColorStop(0.55, '#39414d')
      sky.addColorStop(1, '#20130a')
      ctx.fillStyle = sky
      ctx.fillRect(-30, -30, W + 60, H + 60)

      ctx.fillStyle = 'rgba(255, 176, 72, .72)'
      ctx.beginPath()
      ctx.arc(800, 88, 43, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#1b1209'
      ctx.beginPath()
      ctx.moveTo(-30, 285)
      for (let x = -30; x <= W + 30; x += 90) {
        ctx.lineTo(x, 265 + Math.sin(x * 0.02 + g.world * 0.003) * 18)
      }
      ctx.lineTo(W + 30, H + 30)
      ctx.lineTo(-30, H + 30)
      ctx.closePath()
      ctx.fill()

      ctx.fillStyle = '#201407'
      ctx.fillRect(-30, 310, W + 60, 260)

      for (let i = 30; i > 0; i--) {
        const p1 = i / 30
        const p2 = (i - 1) / 30
        const y1 = 305 + (1 - p1) * (1 - p1) * 270
        const y2 = 305 + (1 - p2) * (1 - p2) * 270
        const road1 = 80 + (1 - p1) * 660
        const road2 = 80 + (1 - p2) * 660
        const curve1 = Math.sin(g.world * 0.006 + i * 0.3) * 70 * (1 - p1)
        const curve2 = Math.sin(g.world * 0.006 + (i - 1) * 0.3) * 70 * (1 - p2)
        const cx1 = W / 2 + curve1 - g.carX * (1 - p1)
        const cx2 = W / 2 + curve2 - g.carX * (1 - p2)

        ctx.fillStyle = i % 2 ? '#34363b' : '#2e3035'
        ctx.beginPath()
        ctx.moveTo(cx1 - road1, y1)
        ctx.lineTo(cx1 + road1, y1)
        ctx.lineTo(cx2 + road2, y2)
        ctx.lineTo(cx2 - road2, y2)
        ctx.closePath()
        ctx.fill()

        ctx.strokeStyle = 'rgba(255, 229, 118, .76)'
        ctx.lineWidth = 2 + (1 - p2) * 5
        ctx.beginPath()
        ctx.moveTo(cx1, y1)
        ctx.lineTo(cx2, y2)
        ctx.stroke()
      }

      const project = (z, lane) => {
        const zz = ((z - g.world) % 9000 + 9000) % 9000
        const depth = 1 - zz / 9000
        if (depth < 0.08 || depth > 0.98) return null
        const y = 304 + depth * depth * 270
        const x = W / 2 + lane * depth - g.carX * depth + Math.sin(g.world * 0.006 + zz * 0.003) * 55 * depth
        return { x, y, s: depth, zz }
      }

      g.items.forEach((it) => {
        const p = project(it.z, it.lane)
        if (!p) return
        const s = 18 + p.s * 26
        ctx.fillStyle = it.type === 'fuel' ? '#22c55e' : '#facc15'
        ctx.fillRect(p.x - s * .55, p.y - s * .65, s * 1.1, s)
        ctx.fillStyle = 'rgba(255,255,255,.45)'
        ctx.fillRect(p.x - s * .3, p.y - s * .5, s * .25, s * .35)
        if (p.s > 0.86 && Math.abs(p.x - W / 2) < 62) {
          if (it.type === 'fuel') g.fuel = clamp(g.fuel + 35, 0, 100)
          else { g.parts += 1; g.hp = clamp(g.hp + 16, 0, 100) }
          it.z += 9000 + random(200, 900)
        }
      })

      g.rocks.forEach((rock) => {
        const p = project(rock.z, rock.lane)
        if (!p) return
        const s = rock.size * p.s
        ctx.fillStyle = '#160f0b'
        ctx.beginPath()
        ctx.ellipse(p.x, p.y, s * 1.45, s, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = 'rgba(255,255,255,.09)'
        ctx.beginPath()
        ctx.ellipse(p.x - s * .3, p.y - s * .25, s * .45, s * .22, 0, 0, Math.PI * 2)
        ctx.fill()
        if (p.s > 0.87 && Math.abs(p.x - W / 2) < 58) {
          g.hp = clamp(g.hp - 18, 0, 100)
          g.speed *= 0.28
          g.shake = 11
          g.lastHit = 12
          rock.z += 9000 + random(400, 1000)
        }
      })

      ctx.save()
      ctx.translate(W / 2, 432)
      ctx.fillStyle = 'rgba(0,0,0,.35)'
      ctx.beginPath()
      ctx.ellipse(0, 55, 110, 18, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#111827'
      ctx.fillRect(-78, -34, 156, 78)
      ctx.fillStyle = '#67e8f9'
      ctx.beginPath()
      ctx.moveTo(-53, -34)
      ctx.lineTo(4, -66)
      ctx.lineTo(60, -34)
      ctx.closePath()
      ctx.fill()
      ctx.fillStyle = '#be123c'
      ctx.fillRect(-91, -1, 182, 40)
      ctx.fillStyle = '#f97316'
      ctx.fillRect(-40, -26, 82, 30)
      ctx.fillStyle = '#020617'
      ctx.beginPath()
      ctx.arc(-57, 43, 24, 0, Math.PI * 2)
      ctx.arc(57, 43, 24, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#facc15'
      ctx.lineWidth = 5
      ctx.strokeRect(-91, -1, 182, 40)
      ctx.fillStyle = '#fde68a'
      ctx.fillRect(-88, 8, 12, 12)
      ctx.fillRect(76, 8, 12, 12)
      ctx.restore()

      if (hitFlash) {
        ctx.fillStyle = `rgba(255,0,0,${hitFlash * .22})`
        ctx.fillRect(-30, -30, W + 60, H + 60)
      }

      ctx.restore()

      const msg = g.hp <= 0 ? 'O carro quebrou. Aperte Recomeçar.' : g.fuel <= 0 ? 'Acabou a gasolina. Aperte Recomeçar.' : 'Pegue galão verde e peça amarela. Desvie das pedras.'
      setHud({ fuel: Math.round(g.fuel), hp: Math.round(g.hp), km: g.km.toFixed(1), parts: g.parts, speed: Math.round(g.speed * 18), msg })
      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  const restart = () => {
    game.current.fuel = 100
    game.current.hp = 100
    game.current.speed = 0
    game.current.km = 0
    game.current.parts = 0
    game.current.world = 0
    game.current.carX = 0
    game.current.items = makeItems()
    game.current.rocks = makeRocks()
  }

  const fullscreen = () => document.documentElement.requestFullscreen?.().catch(() => {})

  return (
    <main className="gamePage">
      <div className="topbar">
        <strong>Doydoyd Road</strong>
        <span>Jogo web leve de estrada</span>
        <button onClick={fullscreen}>Tela cheia</button>
        <button onClick={restart}>Recomeçar</button>
      </div>
      <section className="gameShell">
        <canvas ref={canvasRef} width={W} height={H} />
        <div className="hud">
          <div><b>⛽ Combustível</b><span>{hud.fuel}%</span></div>
          <div><b>🔧 Carro</b><span>{hud.hp}%</span></div>
          <div><b>🧰 Peças</b><span>{hud.parts}</span></div>
          <div><b>⚡ Velocidade</b><span>{hud.speed} km/h</span></div>
          <div><b>🛣️ Distância</b><span>{hud.km} km</span></div>
        </div>
      </section>
      <p className="tips">Controles: W/A/S/D ou setas. Verde = gasolina. Amarelo = peça. Pedra quebra o carro.</p>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<Game />)
