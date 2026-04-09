'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { STACK } from '@/app/lib/stack'

interface GlobeProps {
  exploding: boolean
  imploding: boolean
  visible: boolean
  onExplodeDone?: () => void
  onImplodeDone?: () => void
}

function makeBrandTexture(label: string, color: string, svgPath: string): THREE.CanvasTexture {
  const size = 96
  const c = document.createElement('canvas')
  c.width = size; c.height = size
  const ctx = c.getContext('2d')!

  // Transparent bg — no sphere surface, just floating icon
  ctx.clearRect(0, 0, size, size)

  // Draw SVG path via Path2D
  try {
    const p = new Path2D(svgPath)
    ctx.save()
    // Scale path from 24x24 viewBox to ~52px centered on canvas
    const scale = 52 / 24
    const offset = (size - 52) / 2
    ctx.translate(offset, offset)
    ctx.scale(scale, scale)
    ctx.fillStyle = color
    ctx.fill(p)
    ctx.restore()
  } catch {
    // fallback: text label
    ctx.fillStyle = color
    ctx.font = 'bold 22px Inter, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(label.slice(0, 2), size / 2, size / 2)
  }

  // Label below icon
  ctx.fillStyle = color + 'bb'
  ctx.font = '500 11px Inter, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'
  ctx.fillText(label, size / 2, size - 4)

  return new THREE.CanvasTexture(c)
}

export default function Globe({ exploding, imploding, visible, onExplodeDone, onImplodeDone }: GlobeProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const stateRef = useRef({
    explodeDir: 0,
    explodeT: 0,
    explodeDone: false,
    implodeDone: false,
    isDragging: false,
    prevX: 0,
    prevY: 0,
  })
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    group: THREE.Group
    sprites: { sprite: THREE.Sprite; origPos: THREE.Vector3; scatterPos: THREE.Vector3 }[]
    raf: number
  } | null>(null)

  useEffect(() => {
    if (!mountRef.current) return
    const SIZE = 500

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(SIZE, SIZE)
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 0, 5)

    // No solid sphere — just floating icons forming a sphere shape
    const group = new THREE.Group()
    scene.add(group)

    // Build icon sprites distributed on sphere surface
    const sprites: { sprite: THREE.Sprite; origPos: THREE.Vector3; scatterPos: THREE.Vector3 }[] = []
    const R = 1.9 // sphere radius

    STACK.forEach((ic, i) => {
      const tex = makeBrandTexture(ic.label, ic.color, ic.svgPath)
      const mat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        opacity: 0.92,
        depthWrite: false,
        sizeAttenuation: true,
      })
      const sprite = new THREE.Sprite(mat)

      // Fibonacci sphere distribution
      const phi = Math.acos(-1 + (2 * i) / STACK.length)
      const theta = Math.sqrt(STACK.length * Math.PI) * phi
      const x = R * Math.sin(phi) * Math.cos(theta)
      const y = R * Math.sin(phi) * Math.sin(theta)
      const z = R * Math.cos(phi)
      sprite.position.set(x, y, z)

      // Scale icon by depth (perspective feel)
      sprite.scale.set(0.42, 0.42, 1)

      const origPos = new THREE.Vector3(x, y, z)
      const scatterPos = new THREE.Vector3(
        x * (2.5 + Math.random()),
        y * (2.5 + Math.random()),
        z * (2.5 + Math.random())
      )
      group.add(sprite)
      sprites.push({ sprite, origPos, scatterPos })
    })

    // Store ref BEFORE starting animate
    sceneRef.current = { renderer, scene, camera, group, sprites, raf: 0 }

    const s = stateRef.current

    const animate = () => {
      if (!sceneRef.current) return
      const raf2 = requestAnimationFrame(animate)
      sceneRef.current.raf = raf2

      const t = Date.now() * 0.001

      // Smooth auto-rotate
      if (!s.isDragging) {
        group.rotation.y += 0.0025
        group.rotation.x = Math.sin(t * 0.15) * 0.08
      }

      // Explode
      if (s.explodeDir === 1) {
        s.explodeT = Math.min(1, s.explodeT + 0.022)
        const ep = easeInOut(s.explodeT)
        sprites.forEach(({ sprite, origPos, scatterPos }) => {
          sprite.position.lerpVectors(origPos, scatterPos, ep)
          sprite.material.opacity = 0.92 * (1 - ep * ep)
        })
        if (s.explodeT >= 1 && !s.explodeDone) {
          s.explodeDone = true
          s.explodeDir = 0
          group.visible = false
          onExplodeDone?.()
        }
      }

      // Implode
      if (s.explodeDir === -1) {
        s.explodeT = Math.max(0, s.explodeT - 0.018)
        const ep = easeInOut(s.explodeT)
        sprites.forEach(({ sprite, origPos, scatterPos }) => {
          sprite.position.lerpVectors(origPos, scatterPos, ep)
          sprite.material.opacity = 0.92 * (1 - ep)
        })
        if (s.explodeT <= 0 && !s.implodeDone) {
          s.implodeDone = true
          s.explodeDir = 0
          sprites.forEach(({ sprite, origPos }) => {
            sprite.position.copy(origPos)
            sprite.material.opacity = 0.92
          })
          onImplodeDone?.()
        }
      }

      renderer.render(scene, camera)
    }
    animate()

    // Mouse drag
    const el = renderer.domElement
    const onDown = (e: MouseEvent) => { s.isDragging = true; s.prevX = e.clientX; s.prevY = e.clientY }
    const onUp = () => { s.isDragging = false }
    const onMove = (e: MouseEvent) => {
      if (!s.isDragging) return
      const dx = e.clientX - s.prevX, dy = e.clientY - s.prevY
      group.rotation.y += dx * 0.006
      group.rotation.x += dy * 0.004
      s.prevX = e.clientX; s.prevY = e.clientY
    }
    el.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    document.addEventListener('mousemove', onMove)

    return () => {
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.raf)
        sceneRef.current = null
      }
      el.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      document.removeEventListener('mousemove', onMove)
      renderer.dispose()
      if (mountRef.current?.contains(el)) mountRef.current.removeChild(el)
    }
  }, [])

  // Explode trigger
  useEffect(() => {
    const s = stateRef.current
    const sc = sceneRef.current
    if (exploding) {
      s.explodeDir = 1
      s.explodeDone = false
      if (sc) {
        sc.group.visible = true
        sc.sprites.forEach(({ sprite, origPos }) => {
          sprite.position.copy(origPos)
          sprite.material.opacity = 0.92
        })
      }
    }
  }, [exploding])

  // Implode trigger
  useEffect(() => {
    const s = stateRef.current
    const sc = sceneRef.current
    if (imploding) {
      s.explodeDir = -1
      s.explodeDone = false
      s.implodeDone = false
      s.explodeT = 1
      if (sc) {
        sc.group.visible = true
        sc.sprites.forEach(({ sprite, scatterPos }) => {
          sprite.position.copy(scatterPos)
          sprite.material.opacity = 0
        })
      }
    }
  }, [imploding])

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -56%)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: visible ? 'auto' : 'none',
        zIndex: 2,
        cursor: 'grab',
      }}
    />
  )
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}
