# Sistema de Sonido 3D

Este proyecto incluye un sistema de sonido 3D implementado con React Three Fiber y Three.js.

## Componentes Disponibles

### 1. AmbientSound3D
Genera sonidos sintéticos posicionalmente en el espacio 3D.

**Características:**
- Genera tonos sintéticos usando Web Audio API
- Audio posicional que cambia según la distancia de la cámara
- Visualización interactiva con esferas y anillos
- Control de reproducción mediante clic

**Uso:**
```tsx
<AmbientSound3D 
  position={[x, y, z]}     // Posición en el espacio 3D
  frequency={440}          // Frecuencia del tono (Hz)
  volume={0.3}            // Volumen (0-1)
  distance={5}            // Distancia máxima del sonido
  color="#4fc3f7"         // Color del indicador visual
  autoplay={false}        // Reproducir automáticamente
/>
```

### 2. AudioPlayer3D
Reproduce archivos de audio externos en el espacio 3D.

**Características:**
- Reproduce archivos MP3, WAV, OGG
- Audio posicional con falloff por distancia
- Controles visuales interactivos
- Efectos visuales animados

**Uso:**
```tsx
<AudioPlayer3D 
  audioUrl="/audio/ambiente.mp3"  // Ruta al archivo de audio
  position={[x, y, z]}            // Posición en el espacio 3D
  volume={0.5}                    // Volumen (0-1)
  distance={10}                   // Distancia máxima del sonido
  autoplay={false}                // Reproducir automáticamente
  loop={true}                     // Repetir en bucle
  color="#4fc3f7"                 // Color del indicador visual
/>
```

### 3. Sound3D
Componente base para sonido 3D con mayor control.

**Características:**
- Control completo sobre propiedades de audio 3D
- Configuración de rolloff y modelo de distancia
- API más flexible para casos avanzados

## Archivos de Audio Recomendados

Coloca tus archivos de audio en la carpeta `public/audio/`:

```
public/
  audio/
    ambiente/
      hospital.mp3
      quirofano.mp3
      emergencia.mp3
    efectos/
      alarma.wav
      latidos.mp3
      respiracion.wav
```

## Formatos Soportados

- **MP3** - Mejor compatibilidad
- **WAV** - Mejor calidad
- **OGG** - Alternativa libre
- **M4A** - Soporte limitado

## Consideraciones Técnicas

### Políticas de Autoplay
Los navegadores modernos requieren interacción del usuario antes de reproducir audio. Los componentes manejan esto automáticamente.

### Rendimiento
- Usa archivos comprimidos (MP3) para mejor rendimiento
- Limita el número de fuentes de audio simultáneas
- Considera el tamaño de los archivos para carga web

### Audio 3D
- El sonido cambia según la posición de la cámara
- Mayor distancia = menor volumen
- Funciona mejor con auriculares

## Ejemplo Completo

```tsx
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import AmbientSound3D from "@components/audio/AmbientSound3D"
import AudioPlayer3D from "@components/audio/AudioPlayer3D"

export default function Scene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      
      {/* Sonido sintético de ambiente */}
      <AmbientSound3D 
        position={[2, 0, 0]} 
        frequency={220} 
        volume={0.2} 
        color="#ff4444"
      />
      
      {/* Archivo de audio específico */}
      <AudioPlayer3D 
        audioUrl="/audio/hospital-ambient.mp3"
        position={[-2, 1, 0]} 
        volume={0.3}
        loop={true}
      />
      
      <OrbitControls />
    </Canvas>
  )
}
```

## Personalización

### Colores y Efectos Visuales
Cada componente permite personalizar:
- Color del indicador
- Tamaño de los anillos de alcance
- Efectos de partículas
- Intensidad de emisión

### Parámetros de Audio
- **RefDistance**: Distancia de referencia para el volumen
- **RolloffFactor**: Qué tan rápido disminuye el volumen
- **MaxDistance**: Distancia máxima donde se escucha el sonido
- **DistanceModel**: 'linear', 'inverse', 'exponential'
