import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const W = 960
const H = 540
const clamp = (n, a, b) => Math.max(a, Math.min(b, n))
const random = (a, b) => a + Math.random() * (b - a)
const baseUpgrades = { engine: 1, tank: 1, armor: 1 }

function makeItems() {
  return Array.from({ length: 20 }, (_, i) => ({ z: 650 + i * 430, lane: random(-270, 270), type: Math.random() > 0.45 ? 'fuel' : 'part' }))
}
function makeRocks() {
  return Array.from({ length: 24 }, (_, i) => ({ z: 500 + i * 320, lane: random(-315, 315), size: random(15, 31) }))
}
function newGame(upgrades = baseUpgrades, bankParts = 0) {
  return { carX: 0, speed: 0, fuel: 100 + upgrades.tank * 10, hp: 100 + upgrades.armor * 12, parts: bankParts, km: 0, world: 0, items: makeItems(), rocks: makeRocks(), shake: 0, lastHit: 0, upgrades, running: false }
}

function Game() {
  const canvasRef = useRef(null)
  const keys = useRef({})
  const touch = useRef({ left: false, right: false, gas: false, brake: false })
  const game = useRef(newGame())
  const [screen, setScreen] = useState('menu')
  const [hud, setHud] = useState({ fuel: 110, hp: 112, km: '0.0', parts: 0, speed: 0, msg: 'Clique em Jogar' })
  const [upgrades, setUpgrades] = useState(baseUpgrades)

  useEffect(() => {
    const down = (e) => { keys.current[e.key.toLowerCase()] = true }
    const up = (e) => { keys.current[e.key.toLowerCase()] = false }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    let raf = 0
    const draw = () => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      const g = game.current
      const k = keys.current
      const t = touch.current
      const alive = g.fuel > 0 && g.hp > 0
      if (g.running && alive) {
        if (k.w || k.arrowup || t.gas) g.speed += 0.13 + g.upgrades.engine * 0.035
        if (k.s || k.arrowdown || t.brake) g.speed -= 0.24
        g.speed *= 0.986
        g.speed = clamp(g.speed, 0, 8.5 + g.upgrades.engine * 1.15)
        if (k.a || k.arrowleft || t.left) g.carX -= 4.8 + g.speed * 0.28
        if (k.d || k.arrowright || t.right) g.carX += 4.8 + g.speed * 0.28
        g.carX = clamp(g.carX, -345, 345)
        g.world += g.speed
        g.km += g.speed * 0.004
        g.fuel = clamp(g.fuel - g.speed * (0.0055 - g.upgrades.tank * 0.00035) - ((k.w || k.arrowup || t.gas) ? 0.017 : 0), 0, 100 + g.upgrades.tank * 10)
      } else g.speed *= 0.94
      const hitFlash = g.lastHit > 0 ? g.lastHit / 12 : 0
      g.lastHit = Math.max(0, g.lastHit - 1)
      g.shake *= 0.8
      ctx.save(); ctx.translate(random(-g.shake, g.shake), random(-g.shake, g.shake)); ctx.clearRect(-20, -20, W + 40, H + 40)
      const sky = ctx.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, '#0b1930'); sky.addColorStop(.55, '#39414d'); sky.addColorStop(1, '#20130a'); ctx.fillStyle = sky; ctx.fillRect(-30, -30, W + 60, H + 60)
      ctx.fillStyle = 'rgba(255,176,72,.72)'; ctx.beginPath(); ctx.arc(800, 88, 43, 0, 7); ctx.fill()
      ctx.fillStyle = '#1b1209'; ctx.beginPath(); ctx.moveTo(-30, 285); for (let x = -30; x <= W + 30; x += 90) ctx.lineTo(x, 265 + Math.sin(x * .02 + g.world * .003) * 18); ctx.lineTo(W + 30, H + 30); ctx.lineTo(-30, H + 30); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#201407'; ctx.fillRect(-30, 310, W + 60, 260)
      for (let i = 30; i > 0; i--) { const p1 = i / 30, p2 = (i - 1) / 30, y1 = 305 + (1 - p1) ** 2 * 270, y2 = 305 + (1 - p2) ** 2 * 270, road1 = 80 + (1 - p1) * 660, road2 = 80 + (1 - p2) * 660, cx1 = W / 2 + Math.sin(g.world * .006 + i * .3) * 70 * (1 - p1) - g.carX * (1 - p1), cx2 = W / 2 + Math.sin(g.world * .006 + (i - 1) * .3) * 70 * (1 - p2) - g.carX * (1 - p2); ctx.fillStyle = i % 2 ? '#34363b' : '#2e3035'; ctx.beginPath(); ctx.moveTo(cx1 - road1, y1); ctx.lineTo(cx1 + road1, y1); ctx.lineTo(cx2 + road2, y2); ctx.lineTo(cx2 - road2, y2); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(255,229,118,.76)'; ctx.lineWidth = 2 + (1 - p2) * 5; ctx.beginPath(); ctx.moveTo(cx1, y1); ctx.lineTo(cx2, y2); ctx.stroke() }
      const project = (z, lane) => { const zz = ((z - g.world) % 9000 + 9000) % 9000, depth = 1 - zz / 9000; if (depth < .08 || depth > .98) return null; return { x: W / 2 + lane * depth - g.carX * depth + Math.sin(g.world * .006 + zz * .003) * 55 * depth, y: 304 + depth * depth * 270, s: depth } }
      if (g.running) g.items.forEach(it => { const p = project(it.z, it.lane); if (!p) return; const s = 18 + p.s * 26; ctx.fillStyle = it.type === 'fuel' ? '#22c55e' : '#facc15'; ctx.fillRect(p.x - s * .55, p.y - s * .65, s * 1.1, s); ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.fillRect(p.x - s * .3, p.y - s * .5, s * .25, s * .35); if (p.s > .86 && Math.abs(p.x - W / 2) < 62) { if (it.type === 'fuel') g.fuel = clamp(g.fuel + 35, 0, 100 + g.upgrades.tank * 10); else { g.parts++; g.hp = clamp(g.hp + 13 + g.upgrades.armor, 0, 100 + g.upgrades.armor * 12) } it.z += 9000 + random(200, 900) } })
      if (g.running) g.rocks.forEach(rock => { const p = project(rock.z, rock.lane); if (!p) return; const s = rock.size * p.s; ctx.fillStyle = '#160f0b'; ctx.beginPath(); ctx.ellipse(p.x, p.y, s * 1.45, s, 0, 0, 7); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.09)'; ctx.beginPath(); ctx.ellipse(p.x - s * .3, p.y - s * .25, s * .45, s * .22, 0, 0, 7); ctx.fill(); if (p.s > .87 && Math.abs(p.x - W / 2) < 58) { g.hp = clamp(g.hp - Math.max(7, 21 - g.upgrades.armor * 3), 0, 100 + g.upgrades.armor * 12); g.speed *= .28; g.shake = 11; g.lastHit = 12; rock.z += 9000 + random(400, 1000) } })
      ctx.save(); ctx.translate(W / 2, 432); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.beginPath(); ctx.ellipse(0, 55, 110, 18, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#111827'; ctx.fillRect(-78, -34, 156, 78); ctx.fillStyle = '#67e8f9'; ctx.beginPath(); ctx.moveTo(-53, -34); ctx.lineTo(4, -66); ctx.lineTo(60, -34); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#be123c'; ctx.fillRect(-91, -1, 182, 40); ctx.fillStyle = '#f97316'; ctx.fillRect(-40, -26, 82, 30); ctx.fillStyle = '#020617'; ctx.beginPath(); ctx.arc(-57, 43, 24, 0, 7); ctx.arc(57, 43, 24, 0, 7); ctx.fill(); ctx.strokeStyle = '#facc15'; ctx.lineWidth = 5; ctx.strokeRect(-91, -1, 182, 40); ctx.fillStyle = '#fde68a'; ctx.fillRect(-88, 8, 12, 12); ctx.fillRect(76, 8, 12, 12); ctx.restore()
      if (hitFlash) { ctx.fillStyle = `rgba(255,0,0,${hitFlash * .22})`; ctx.fillRect(-30, -30, W + 60, H + 60) }
      if (!g.running) { ctx.fillStyle = 'rgba(0,0,0,.38)'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#fff'; ctx.font = '900 44px Segoe UI'; ctx.fillText('DOYDOYD ROAD', 292, 238); ctx.font = '600 18px Segoe UI'; ctx.fillText('Estrada, peças, gasolina e upgrades', 325, 272) }
      ctx.restore()
      const msg = g.hp <= 0 ? 'O carro quebrou. Vá na garagem ou recomece.' : g.fuel <= 0 ? 'Acabou a gasolina. Vá na garagem ou recomece.' : g.running ? 'Verde = gasolina. Amarelo = peça. Pedra quebra o carro.' : 'Clique em Jogar'
      setHud({ fuel: Math.round(g.fuel), hp: Math.round(g.hp), km: g.km.toFixed(1), parts: g.parts, speed: Math.round(g.speed * 18), msg })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('keydown', down); window.removeEventListener('keyup', up) }
  }, [])

  const start = () => { game.current.running = true; setScreen('game') }
  const restart = () => { game.current = newGame(upgrades, game.current.parts); game.current.running = true; setScreen('game') }
  const buy = (kind) => { const cost = upgrades[kind] * 3; if (game.current.parts < cost) return; game.current.parts -= cost; const next = { ...upgrades, [kind]: upgrades[kind] + 1 }; setUpgrades(next); game.current.upgrades = next; game.current.fuel = clamp(game.current.fuel, 0, 100 + next.tank * 10); game.current.hp = clamp(game.current.hp + (kind === 'armor' ? 15 : 0), 0, 100 + next.armor * 12) }
  const fullscreen = () => document.documentElement.requestFullscreen?.().catch(() => {})
  const press = (name, value) => { touch.current[name] = value }

  return <main className="gamePage"><div className="topbar"><strong>Doydoyd Road</strong><span>{hud.msg}</span><button onClick={start}>Jogar</button><button onClick={() => setScreen(screen === 'garage' ? 'game' : 'garage')}>Garagem</button><button onClick={fullscreen}>Tela cheia</button><button onClick={restart}>Recomeçar</button></div><section className="gameShell"><canvas ref={canvasRef} width={W} height={H}/><div className="hud"><div><b>⛽ Combustível</b><span>{hud.fuel}%</span></div><div><b>🔧 Carro</b><span>{hud.hp}%</span></div><div><b>🧰 Peças</b><span>{hud.parts}</span></div><div><b>⚡ Velocidade</b><span>{hud.speed} km/h</span></div><div><b>🛣️ Distância</b><span>{hud.km} km</span></div></div>{screen === 'garage' && <div className="garage"><h2>Garagem</h2><p>Use peças amarelas para melhorar o carro.</p><button onClick={() => buy('engine')}>Motor nível {upgrades.engine} — custa {upgrades.engine * 3}</button><button onClick={() => buy('tank')}>Tanque nível {upgrades.tank} — custa {upgrades.tank * 3}</button><button onClick={() => buy('armor')}>Blindagem nível {upgrades.armor} — custa {upgrades.armor * 3}</button><small>Motor aumenta velocidade. Tanque economiza gasolina. Blindagem reduz dano.</small></div>}<div className="touchControls"><button onPointerDown={() => press('left', true)} onPointerUp={() => press('left', false)} onPointerLeave={() => press('left', false)}>◀</button><button onPointerDown={() => press('right', true)} onPointerUp={() => press('right', false)} onPointerLeave={() => press('right', false)}>▶</button><button onPointerDown={() => press('brake', true)} onPointerUp={() => press('brake', false)} onPointerLeave={() => press('brake', false)}>Freio</button><button onPointerDown={() => press('gas', true)} onPointerUp={() => press('gas', false)} onPointerLeave={() => press('gas', false)}>Acelerar</button></div></section><p className="tips">Teclado: WASD/setas. Tablet: botões na tela. Peças compram upgrade na garagem.</p></main>
}

createRoot(document.getElementById('root')).render(<Game />)
