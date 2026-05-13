import { Link, useLocation } from 'react-router-dom'
import './Header.css'

function Header({ totalItens = 0 }) {
  const location = useLocation()

  return (
    <header className="header">
      <div className="header-conteudo">
        <Link to="/" className="header-logo">
          🌵 Raízes do Nordeste
        </Link>

        <nav className="header-nav">
          <Link to="/" className={location.pathname === '/' ? 'ativo' : ''}>
            Home
          </Link>
          <Link to="/cardapio" className={location.pathname === '/cardapio' ? 'ativo' : ''}>
            Cardápio
          </Link>
          <Link to="/acompanhamento" className={location.pathname === '/acompanhamento' ? 'ativo' : ''}>
            Pedidos
          </Link>
          <Link to="/fidelizacao" className={location.pathname === '/fidelizacao' ? 'ativo' : ''}>
            Pontos
          </Link>
          <Link
            to="/carrinho"
            className={`header-carrinho ${location.pathname === '/carrinho' ? 'ativo' : ''}`}
          >
            🛒
            {totalItens > 0 && (
              <span className="header-badge">{totalItens}</span>
            )}
          </Link>
          <Link to="/login" className={location.pathname === '/login' ? 'ativo' : ''}>
            Entrar
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
