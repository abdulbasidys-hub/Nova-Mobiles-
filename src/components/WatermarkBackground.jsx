import { useTheme } from '../context/ThemeContext'

export default function WatermarkBackground({
  src,
  lightOpacity = 0.04,
  darkOpacity  = 0.06,
  size = '440px',
  align = 'center',
}) {
  const { theme } = useTheme()
  if (!src) return null
  const opacity = theme === 'dark' ? darkOpacity : lightOpacity
  const alignStyle = align === 'right' ? { right: '-3rem', left: 'auto' }
    : align === 'left' ? { left: '-3rem', right: 'auto' }
    : { left: '50%', transform: 'translateX(-50%)' }

  return (
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0,
      pointerEvents: 'none', overflow: 'hidden', zIndex: 0,
    }}>
      <img src={src} alt="" style={{
        position: 'absolute',
        top: '50%',
        transform: align === 'center' ? 'translate(-50%,-50%)' : 'translateY(-50%)',
        ...alignStyle,
        width: size, maxWidth: '90%',
        opacity,
        filter: 'grayscale(100%)',
        userSelect: 'none',
        transition: 'opacity 0.3s',
      }} />
    </div>
  )
}
