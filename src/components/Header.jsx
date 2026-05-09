import { Link, useLocation } from 'react-router-dom'
import './Header.css'

function Header() {
  const location = useLocation()

  return (
    <header className="header">
      <div className="header-conteudo">
        <Link to="/" className="header-logo">
          🌵 Raízes do Nordeste
        </Link>

        <nav className="header-nav">
          <Link
            to="/"
            className={location.pathname === '/' ? 'ativo' : ''}
          >
            Home
          </Link>
          <Link
            to="/cardapio"
            className={location.pathname === '/cardapio' ? 'ativo' : ''}
          >
            Cardápio
          </Link>
          <Link
            to="/carrinho"
            className={location.pathname === '/carrinho' ? 'ativo' : ''}
          >
            🛒
          </Link>
          <Link
            to="/login"
            className={location.pathname === '/login' ? 'ativo' : ''}
          >
            Entrar
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
