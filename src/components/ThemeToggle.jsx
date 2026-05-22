import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      className="btn-icon"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 36, height: 36, borderRadius: 8,
        background: 'var(--bg-elevated)',
        border: '1.5px solid var(--border)',
        color: 'var(--text-muted)',
        cursor: 'pointer',
        transition: 'all 0.18s',
        fontSize: 16,
      }}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
