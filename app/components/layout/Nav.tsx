'use client'
import { SectionId } from '@/app/hooks/useScroll'

interface NavProps {
  current: SectionId
  goTo: (id: SectionId) => void
}

export default function Nav({ current, goTo }: NavProps) {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '22px 48px',
      zIndex: 200,
      background: 'linear-gradient(to bottom, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.6) 70%, transparent 100%)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
    }}>
      <button
        onClick={() => goTo('hero')}
        style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: '1.05rem', color: 'var(--paper)',
          letterSpacing: '0.12em', background: 'none', border: 'none',
          padding: 0,
        }}
      >
        DevBros<span style={{ color: '#7c6dfa' }}>.</span>
      </button>

      <div style={{ display: 'flex', gap: '32px' }}>
        {(['about', 'services', 'clients', 'testimonials', 'contact'] as SectionId[]).map(id => (
          <button
            key={id}
            onClick={() => goTo(id)}
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: current === id ? '#fff' : 'rgba(255,255,255,0.35)',
              background: 'none', border: 'none', padding: 0,
              transition: 'color 0.2s',
              fontFamily: "'Inter', sans-serif",
              position: 'relative',
            }}
          >
            {id}
            {current === id && (
              <span style={{
                position: 'absolute',
                bottom: '-4px',
                left: 0, right: 0,
                height: '1px',
                background: '#7c6dfa',
                borderRadius: '1px',
              }} />
            )}
          </button>
        ))}
      </div>
    </nav>
  )
}
