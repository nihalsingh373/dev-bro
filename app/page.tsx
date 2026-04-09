'use client'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useScroll } from './hooks/useScroll'
import Nav from './components/layout/Nav'
import ProgressDots from './components/layout/ProgressDots'
import Cursor from './components/cursor/Cursor'
import Spotlight from './components/cursor/Spotlight'
import TestimonialsSection from './components/sections/TestimonialsSection'
import ClientsSection from './components/sections/ClientsSection'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import ServicesSection from './components/sections/ServicesSection'
import ContactSection from './components/sections/ContactSection'

const Globe = dynamic(() => import('./components/globe/Globe'), { ssr: false })

export default function Home() {
  const { current, goTo } = useScroll()
  const [globeState, setGlobeState] = useState<'idle'|'exploding'|'exploded'|'imploding'>('idle')
  const [globeVisible, setGlobeVisible] = useState(true)

  useEffect(() => {
    if (current === 'hero') {
      setGlobeVisible(true)
      setGlobeState('imploding')
    } else if (globeState === 'idle' || globeState === 'imploding') {
      setGlobeState('exploding')
    }
  }, [current])

  return (
    <main style={{ width:'100vw', height:'100vh', background:'#000', position:'relative', overflow:'hidden' }}>
      <Cursor />
      <Spotlight />
      <Nav current={current} goTo={goTo} />
      <ProgressDots current={current} goTo={goTo} />
      <Globe
        visible={globeVisible}
        exploding={globeState === 'exploding'}
        imploding={globeState === 'imploding'}
        onExplodeDone={() => { setGlobeState('exploded'); setGlobeVisible(false) }}
        onImplodeDone={() => setGlobeState('idle')}
      />
      <HeroSection visible={current === 'hero'} goTo={goTo} />
      <AboutSection visible={current === 'about'} />
      <ServicesSection visible={current === 'services'} />
      <ClientsSection visible={current === 'clients'} />
      <TestimonialsSection visible={current === 'testimonials'} />
      <ContactSection visible={current === 'contact'} />

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/917667803599?text=Hi%20DevBros%2C%20I'd%20like%20to%20discuss%20a%20project"
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="hover"
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          background: '#25D366',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 300,
          boxShadow: '0 4px 24px rgba(37,211,102,0.35)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          textDecoration: 'none',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 32px rgba(37,211,102,0.55)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 24px rgba(37,211,102,0.35)';
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </main>
  )
}
