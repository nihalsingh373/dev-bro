'use client'
import { SECTION_ORDER, SECTION_LABELS, SectionId } from '@/app/hooks/useScroll'

interface ProgressDotsProps {
  current: SectionId
  goTo: (id: SectionId) => void
}

export default function ProgressDots({ current, goTo }: ProgressDotsProps) {
  return (
    <div style={{
      position: 'fixed', right: '28px', top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex', flexDirection: 'column', gap: '10px',
      zIndex: 200,
    }}>
      {SECTION_ORDER.map(id => (
        <button
          key={id}
          onClick={() => goTo(id)}
          title={SECTION_LABELS[id]}
          data-cursor="hover"
          style={{
            width: current === id ? '6px' : '5px',
            height: current === id ? '6px' : '5px',
            borderRadius: '50%',
            background: current === id ? '#7c6dfa' : 'rgba(255,255,255,0.2)',
            border: 'none',
            padding: 0,
            transform: current === id ? 'scale(1.5)' : 'scale(1)',
            transition: 'all 0.3s cubic-bezier(0.2,1,0.2,1)',
          }}
        />
      ))}
    </div>
  )
}
