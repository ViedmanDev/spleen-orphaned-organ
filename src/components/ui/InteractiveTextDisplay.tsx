"use client"

import Text3D from './Text3D'
import TextOverlay2D from './TextOverlay2D'

interface InteractiveTextDisplayProps {
  title3D: string
  subtitle3D: string
  overlay1: string
  overlay2: string
  position3D1?: [number, number, number]
  position3D2?: [number, number, number]
  overlay1Position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  overlay2Position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  themeColor?: string
  section: 'trauma' | 'symptoms' | 'surgery'
}

export default function InteractiveTextDisplay({
  title3D,
  subtitle3D,
  overlay1,
  overlay2,
  position3D1 = [2, 1.5, 0],
  position3D2 = [-2, -1, 0],
  overlay1Position = 'top-left',
  overlay2Position = 'bottom-right',
  themeColor = '#4fc3f7',
  section
}: InteractiveTextDisplayProps) {
  
  const getThemeColors = () => {
    switch (section) {
      case 'trauma':
        return {
          primary: '#ff4444',
          secondary: '#ff8888',
          overlayBg: 'rgba(255, 68, 68, 0.9)'
        }
      case 'symptoms':
        return {
          primary: '#ff8800',
          secondary: '#ffaa44',
          overlayBg: 'rgba(255, 136, 0, 0.9)'
        }
      case 'surgery':
        return {
          primary: '#00cc88',
          secondary: '#44dd99',
          overlayBg: 'rgba(0, 204, 136, 0.9)'
        }
      default:
        return {
          primary: themeColor,
          secondary: themeColor,
          overlayBg: 'rgba(79, 195, 247, 0.9)'
        }
    }
  }

  const colors = getThemeColors()

  return (
    <>
      {/* Textos 3D */}
      <Text3D 
        text={title3D}
        position={position3D1}
        fontSize={0.3}
        color={colors.primary}
        animate={true}
        animationType={section === 'surgery' ? 'pulse' : 'float'}
      />
      <Text3D 
        text={subtitle3D}
        position={position3D2}
        fontSize={0.24}
        color={colors.secondary}
        animate={true}
        animationType={section === 'symptoms' ? 'rotate' : section === 'surgery' ? 'float' : 'pulse'}
      />
      
      {/* Textos 2D superpuestos */}
      <TextOverlay2D 
        text={overlay1}
        position={overlay1Position}
        backgroundColor={colors.overlayBg}
        animated={true}
        animationType={section === 'trauma' ? 'slide' : section === 'symptoms' ? 'bounce' : 'fade'}
      />
      <TextOverlay2D 
        text={overlay2}
        position={overlay2Position}
        backgroundColor={colors.overlayBg.replace('0.9', '0.8')}
        animated={true}
        animationType={section === 'trauma' ? 'fade' : 'slide'}
      />
    </>
  )
}
