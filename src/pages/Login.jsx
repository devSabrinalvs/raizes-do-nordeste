import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import './Login.css'

function Login() {
  const [aba, setAba] = useState('login')
  const navigate = useNavigate()

  const [formLogin, setFormLogin] = useState({ email: '', senha: '' })
  const [formCadastro, setFormCadastro] = useState({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    lgpd: false
  })

  const [erroLogin, setErroLogin] = useState('')
  const [erroCadastro, setErroCadastro] = useState('')

  function handleLogin(e) {
    e.preventDefault()
    if (!formLogin.email || !formLogin.senha) {
      setErroLogin('Preencha todos os campos.')
      return
    }
    
    if (formLogin.email === 'maria.silva@email.com' && formLogin.senha === '123456') {
      navigate('/')
    } else {
      setErroLogin('E-mail ou senha incorretos.')
    }
  }

  function handleCadastro(e) {
    e.preventDefault()
    if (!formCadastro.nome || !formCadastro.email || !formCadastro.senha) {
      setErroCadastro('Preencha todos os campos obrigatórios.')
      return
    }
    if (!formCadastro.lgpd) {
      setErroCadastro('Você precisa aceitar a política de privacidade para continuar.')
      return
    }
    navigate('/')
  }

  return (
    <div className="login-container">
      <div className="login-abas">
        <button
          className={aba === 'login' ? 'aba ativa' : 'aba'}
          onClick={() => setAba('login')}
        >
          Entrar
        </button>
        <button
          className={aba === 'cadastro' ? 'aba ativa' : 'aba'}
          onClick={() => setAba('cadastro')}
        >
          Criar conta
        </button>
      </div>

      {aba === 'login' && (
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Bem-vindo de volta!</h2>

          <div className="campo">
            <label>E-mail</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={formLogin.email}
              onChange={e => setFormLogin({ ...formLogin, email: e.target.value })}
            />
          </div>

          <div className="campo">
            <label>Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              value={formLogin.senha}
              onChange={e => setFormLogin({ ...formLogin, senha: e.target.value })}
            />
          </div>

          {erroLogin && <p className="login-erro">{erroLogin}</p>}

          <Button type="submit">Entrar</Button>

          <p className="login-dica">
            Teste: maria.silva@email.com / 123456
          </p>
        </form>
      )}

      {aba === 'cadastro' && (
        <form className="login-form" onSubmit={handleCadastro}>
          <h2>Crie sua conta</h2>

          <div className="campo">
            <label>Nome completo *</label>
            <input
              type="text"
              placeholder="Seu nome"
              value={formCadastro.nome}
              onChange={e => setFormCadastro({ ...formCadastro, nome: e.target.value })}
            />
          </div>

          <div className="campo">
            <label>E-mail *</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={formCadastro.email}
              onChange={e => setFormCadastro({ ...formCadastro, email: e.target.value })}
            />
          </div>

          <div className="campo">
            <label>Telefone</label>
            <input
              type="tel"
              placeholder="(00) 00000-0000"
              value={formCadastro.telefone}
              onChange={e => setFormCadastro({ ...formCadastro, telefone: e.target.value })}
            />
          </div>

          <div className="campo">
            <label>Senha *</label>
            <input
              type="password"
              placeholder="••••••••"
              value={formCadastro.senha}
              onChange={e => setFormCadastro({ ...formCadastro, senha: e.target.value })}
            />
          </div>

          <div className="campo-lgpd">
            <input
              type="checkbox"
              id="lgpd"
              checked={formCadastro.lgpd}
              onChange={e => setFormCadastro({ ...formCadastro, lgpd: e.target.checked })}
            />
            <label htmlFor="lgpd">
              Concordo com a{' '}
              <a href="#" className="lgpd-link">Política de Privacidade</a>
              {' '}e autorizo o uso dos meus dados conforme a{' '}
              <strong>Lei nº 13.709/2018 (LGPD)</strong>.
            </label>
          </div>

          {erroCadastro && <p className="login-erro">{erroCadastro}</p>}

          <Button type="submit">Criar conta</Button>
        </form>
      )}
    </div>
  )
}

export default Login
