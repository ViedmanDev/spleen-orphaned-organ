# Sistema de Textos 2D y 3D

Este proyecto incluye un sistema completo de textos 2D y 3D implementado para mejorar la experiencia visual en las secciones de enfermedades.

## Componentes Implementados

### 1. Text3D - Textos 3D Básicos
Renderiza texto directamente en el espacio 3D con animaciones.

**Características:**
- Texto flotante en el espacio 3D
- Animaciones: float, rotate, pulse
- Personalizable en color, tamaño y posición
- Interactividad opcional

**Uso:**
```tsx
<Text3D 
  text="LESIÓN ESPLÉNICA"
  position={[3, 2, 0]}
  fontSize={0.3}
  color="#ff4444"
  animate={true}
  animationType="float"
/>
```

### 2. AdvancedText3D - Textos 3D Avanzados
Versión mejorada con efectos adicionales y mayor control.

**Características:**
- Efectos de resplandor y partículas
- Bordes y contornos configurables
- Interactividad con hover
- Animaciones más complejas (glow, sparkle)

**Uso:**
```tsx
<AdvancedText3D 
  text="CIRUGÍA ESPLÉNICA"
  position={[2, 2, 0]}
  fontSize={0.4}
  color="#00cc88"
  strokeColor="#004433"
  animate={true}
  animationType="glow"
  showParticles={true}
  interactive={true}
  hoverColor="#44ffaa"
/>
```

### 3. TextOverlay2D - Textos 2D Superpuestos
Textos que se muestran sobre el Canvas 3D como overlay.

**Características:**
- Posicionamiento flexible (esquinas o centro)
- Fondo con transparencia y blur
- Animaciones de entrada
- Botón de cierre opcional

**Uso:**
```tsx
<TextOverlay2D 
  text="⚠️ Trauma de Alto Impacto"
  position="top-left"
  backgroundColor="rgba(255, 68, 68, 0.9)"
  animated={true}
  animationType="slide"
/>
```

### 4. InteractiveTextDisplay - Sistema Combinado
Componente que combina múltiples textos con temas coherentes.

**Características:**
- Combina 2 textos 3D + 2 textos 2D
- Temas predefinidos por sección
- Coordinación de colores automática
- Animaciones complementarias

**Uso:**
```tsx
<InteractiveTextDisplay
  title3D="LESIÓN ESPLÉNICA"
  subtitle3D="URGENCIA MÉDICA"
  overlay1="⚠️ Trauma de Alto Impacto"
  overlay2="Hemorragia Interna Posible"
  section="trauma"
  position3D1={[3, 2, 0]}
  position3D2={[-3, -1.5, 0]}
/>
```

## Implementación Actual

### Sección 1: Trauma Abdominal
- **Textos 3D:**
  - "LESIÓN ESPLÉNICA" (flotante, rojo)
  - "URGENCIA MÉDICA" (pulsante, rojo claro)
- **Textos 2D:**
  - "⚠️ Trauma de Alto Impacto" (superior izquierda)
  - "Hemorragia Interna Posible" (inferior derecha)

### Sección 2: Síntomas (Accidente)
- **Textos 3D:**
  - "DOLOR ABDOMINAL" (flotante, naranja)
  - "EMERGENCIA 911" (rotativo, naranja claro)
- **Textos 2D:**
  - "🚨 Signos de Alerta" (superior derecha)
  - "Monitoreo Constante Requerido" (inferior izquierda)

### Sección 3: Tratamiento Quirúrgico
- **Textos 3D:**
  - "CIRUGÍA ESPLÉNICA" (pulsante, verde)
  - "PROCEDIMIENTO EXITOSO" (flotante, verde claro)
- **Textos 2D:**
  - "✅ Intervención Quirúrgica" (superior izquierda)
  - "Recuperación Supervisada" (inferior derecha)

## Animaciones Disponibles

### Para Textos 3D:
- **float**: Movimiento vertical suave
- **rotate**: Rotación continua en Y
- **pulse**: Escalado rítmico
- **glow**: Efecto de resplandor pulsante
- **sparkle**: Rotación sutil con escalado

### Para Textos 2D:
- **fade**: Aparición gradual
- **slide**: Deslizamiento desde arriba
- **bounce**: Efecto de rebote

## Personalización de Colores

### Tema Trauma (Rojo):
- Primario: `#ff4444`
- Secundario: `#ff8888`
- Overlay: `rgba(255, 68, 68, 0.9)`

### Tema Síntomas (Naranja):
- Primario: `#ff8800`
- Secundario: `#ffaa44`
- Overlay: `rgba(255, 136, 0, 0.9)`

### Tema Cirugía (Verde):
- Primario: `#00cc88`
- Secundario: `#44dd99`
- Overlay: `rgba(0, 204, 136, 0.9)`

## Mejores Prácticas

### Posicionamiento 3D:
- Usar coordenadas que no interfieran con los modelos
- Mantener textos dentro del campo de visión de la cámara
- Considerar la rotación de OrbitControls

### Textos 2D:
- Usar posiciones que no obstruyan elementos importantes
- Mantener textos concisos y legibles
- Coordinar colores con el tema de la sección

### Rendimiento:
- Limitar el número de textos animados simultáneos
- Usar animaciones suaves (60fps)
- Optimizar el tamaño de fuentes según la importancia

## Ejemplos de Uso Avanzado

### Texto Interactivo con Evento:
```tsx
<Text3D 
  text="HACER CLIC AQUÍ"
  position={[0, 0, 0]}
  color="#4fc3f7"
  onClick={() => alert('¡Texto clickeado!')}
  animate={true}
  animationType="pulse"
/>
```

### Overlay con Cierre Manual:
```tsx
<TextOverlay2D 
  text="Información Importante"
  position="center"
  onClick={() => console.log('Overlay clickeado')}
  animated={true}
  animationType="bounce"
/>
```

### Texto con Efectos Especiales:
```tsx
<AdvancedText3D 
  text="TEXTO ESPECTACULAR"
  fontSize={0.6}
  color="#gold"
  strokeColor="#darkgoldenrod"
  strokeWidth={0.05}
  animationType="sparkle"
  showParticles={true}
  interactive={true}
/>
```

## Compatibilidad

- ✅ React Three Fiber
- ✅ @react-three/drei
- ✅ Next.js 13+
- ✅ TypeScript
- ✅ Dispositivos móviles
- ✅ Navegadores modernos
