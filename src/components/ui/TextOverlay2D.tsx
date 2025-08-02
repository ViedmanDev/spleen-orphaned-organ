"use client"

import { useState } from 'react'
import styles from './TextOverlay2D.module.css'

interface TextOverlay2DProps {
  text: string
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
  backgroundColor?: string
  textColor?: string
  fontSize?: string
  padding?: string
  borderRadius?: string
  opacity?: number
  animated?: boolean
  animationType?: 'fade' | 'slide' | 'bounce' | 'none'
  onClick?: () => void
  className?: string
}

export default function TextOverlay2D({
  text,
  position = 'top-left',
  backgroundColor = 'rgba(0, 0, 0, 0.7)',
  textColor = '#ffffff',
  fontSize = '14px',
  padding = '10px 15px',
  borderRadius = '8px',
  opacity = 0.9,
  animated = false,
  animationType = 'fade',
  onClick,
  className = ''
}: TextOverlay2DProps) {
  const [isVisible, setIsVisible] = useState(true)

  const getPositionClass = () => {
    switch (position) {
      case 'top-left': return styles.topLeft
      case 'top-right': return styles.topRight
      case 'bottom-left': return styles.bottomLeft
      case 'bottom-right': return styles.bottomRight
      case 'center': return styles.center
      default: return styles.topLeft
    }
  }

  const getAnimationClass = () => {
    if (!animated) return ''
    switch (animationType) {
      case 'fade': return styles.fadeIn
      case 'slide': return styles.slideIn
      case 'bounce': return styles.bounceIn
      default: return ''
    }
  }

  const overlayStyle = {
    backgroundColor,
    color: textColor,
    fontSize,
    padding,
    borderRadius,
    opacity,
  }

  if (!isVisible) return null

  return (
    <div
      className={`${styles.textOverlay} ${getPositionClass()} ${getAnimationClass()} ${className}`}
      style={overlayStyle}
      onClick={onClick}
    >
      <span className={styles.textContent}>
        {text}
      </span>
      {onClick && (
        <button 
          className={styles.closeButton}
          onClick={(e) => {
            e.stopPropagation()
            setIsVisible(false)
          }}
        >
          ×
        </button>
      )}
    </div>
  )
}
