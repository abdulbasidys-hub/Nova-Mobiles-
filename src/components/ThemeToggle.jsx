import { useTheme } from '../context/ThemeContext'
export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button onClick={toggle} title="Toggle theme" style={{
      width: 34, height: 34, borderRadius: 6,
      background: 'var(--bg-surface)',
      border: '1px solid var(--rule-strong)',
      color: 'var(--ink-muted)',
      cursor: 'pointer', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      fontSize: 15, transition: 'border-color 0.15s',
      flexShrink: 0,
    }}>
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
