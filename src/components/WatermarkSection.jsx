import { useTheme } from '../context/ThemeContext'
export default function WatermarkSection({ src, children, style: s, lightOp = 0.035, darkOp = 0.06, wmSize = '460px', wmAlign = 'center' }) {
  const { theme } = useTheme()
  const op = theme === 'dark' ? darkOp : lightOp
  const alignMap = { right: { right: '-4rem', left: 'auto' }, left: { left: '-4rem', right: 'auto' }, center: { left: '50%', transform: 'translate(-50%,-50%)' } }
  return (
    <div style={{ position: 'relative', overflow: 'hidden', ...s }}>
      {src && (
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <img src={src} alt="" style={{
            position: 'absolute', top: '50%',
            transform: wmAlign === 'center' ? 'translate(-50%,-50%)' : 'translateY(-50%)',
            ...alignMap[wmAlign],
            width: wmSize, maxWidth: '85%',
            opacity: op, filter: 'grayscale(100%)', userSelect: 'none',
          }} />
        </div>
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  )
}
