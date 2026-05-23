export default function CTAButton({ href, to, onClick, variant = 'blue', size = '', full = false, children, target }) {
  const cls = `btn btn-${variant}${size ? ' btn-' + size : ''}${full ? ' btn-w' : ''}`
  if (href) return <a href={href} className={cls} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}>{children}</a>
  if (to) {
    const { Link } = require('react-router-dom')
    return <Link to={to} className={cls}>{children}</Link>
  }
  return <button className={cls} onClick={onClick}>{children}</button>
}
