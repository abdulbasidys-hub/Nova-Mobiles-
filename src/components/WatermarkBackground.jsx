export default function WatermarkBackground({ src, opacity = 0.05, size = '420px', position = 'center' }) {
  if (!src) return null
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: position === 'right' ? 'flex-end' : position === 'left' ? 'flex-start' : 'center',
      }}
    >
      <img
        src={src}
        alt=""
        style={{
          width: size,
          maxWidth: '80%',
          opacity,
          filter: 'grayscale(100%)',
          userSelect: 'none',
          flexShrink: 0,
          marginRight: position === 'right' ? '-4rem' : 0,
          marginLeft: position === 'left' ? '-4rem' : 0,
        }}
      />
    </div>
  )
}
