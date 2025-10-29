'use client'
import { cn } from '@/lib/utils'
import type React from 'react'
import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  useEffect,
  useRef,
} from 'react'

interface GlowAreaProps extends ComponentPropsWithoutRef<'div'> {
  size?: number
}

export const GlowArea = (props: GlowAreaProps) => {
  const { className = '', size = 300, ...rest } = props
  const element = useRef<HTMLDivElement>(null)
  const frameId = useRef<number | null>(null)
  const latestCoords = useRef<{ x: number; y: number } | null>(null)

  const updateGlow = () => {
    if (latestCoords.current && element.current) {
      element.current.style.setProperty(
        '--glow-x',
        `${latestCoords.current.x}px`
      )
      element.current.style.setProperty(
        '--glow-y',
        `${latestCoords.current.y}px`
      )
      frameId.current = null
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect()
    latestCoords.current = {
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    }

    if (!frameId.current) {
      frameId.current = requestAnimationFrame(() => updateGlow())
    }
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.removeProperty('--glow-x')
    e.currentTarget.style.removeProperty('--glow-y')
  }
  return (
    <div
      ref={element}
      style={
        {
          position: 'relative',
          '--glow-size': `${size}px`,
        } as CSSProperties
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(className, '')}
      {...rest}
    />
  )
}

GlowArea.displayName = 'GlowArea'

interface GlowProps extends ComponentPropsWithoutRef<'div'> {
  color?: string
}

export const Glow = (props: GlowProps) => {
  const {
    className,
    color = 'rgba(0, 255, 255, 0.4)',
    children,
    ...rest
  } = props
  const element = useRef<HTMLDivElement>(null)

  useEffect(() => {
    element.current?.style.setProperty(
      '--glow-top',
      `${element.current?.offsetTop}px`
    )
    element.current?.style.setProperty(
      '--glow-left',
      `${element.current?.offsetLeft}px`
    )
  }, [])

  return (
    <div ref={element} className={cn(className, 'relative')}>
      <div
        {...rest}
        style={{
          backgroundImage: `radial-gradient(
            circle var(--glow-size) at calc(var(--glow-x, -99999px) - var(--glow-left, 0px))
            calc(var(--glow-y, -99999px) - var(--glow-top, 0px)),
            ${color} 0%,
            rgba(0, 255, 255, 0.15) 25%,
            transparent 70%
          )`,
          opacity: 1,
          filter: 'blur(30px)',
        }}
        className={cn(
          className,
          'absolute inset-0 pointer-events-none z-0 mix-blend-screen'
        )}
      ></div>
      <div className="relative pointer-events-auto z-10">{children}</div>
    </div>
  )
}

Glow.displayName = 'Glow'
