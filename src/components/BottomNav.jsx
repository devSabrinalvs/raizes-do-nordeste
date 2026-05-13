import { Link, useLocation } from 'react-router-dom'
import './BottomNav.css'

function BottomNav({ totalItens = 0 }) {
  const location = useLocation()

  const links = [
    { to: '/', label: 'Início', icone: '🏠' },
    { to: '/cardapio', label: 'Cardápio', icone: '🍽️' },
    { to: '/carrinho', label: 'Carrinho', icone: '🛒', badge: totalItens },
    { to: '/acompanhamento', label: 'Pedidos', icone: '📦' },
    { to: '/fidelizacao', label: 'Pontos', icone: '⭐' },
  ]

  return (
    <nav className="bottom-nav">
      {links.map(link => (
        <Link
          key={link.to}
          to={link.to}
          className={`bottom-nav-item ${location.pathname === link.to ? 'ativo' : ''}`}
        >
          <span className="bottom-nav-icone">
            {link.icone}
            {link.badge > 0 && <span className="bottom-nav-badge">{link.badge}</span>}
          </span>
          <span className="bottom-nav-label">{link.label}</span>
        </Link>
      ))}
    </nav>
  )
}

export default BottomNav
