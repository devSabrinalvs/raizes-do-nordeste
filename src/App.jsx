import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Cardapio from './pages/Cardapio'
import './App.css'

function App() {
  const [carrinho, setCarrinho] = useState([])

  function adicionarCarrinho(item, quantidade) {
    setCarrinho(prev => {
      const existe = prev.find(i => i.id === item.id)
      if (existe) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantidade: i.quantidade + quantidade } : i
        )
      }
      return [...prev, { ...item, quantidade }]
    })
  }

  function removerCarrinho(id) {
    setCarrinho(prev => prev.filter(i => i.id !== id))
  }

  function limparCarrinho() {
    setCarrinho([])
  }

  const totalItens = carrinho.reduce((acc, i) => acc + i.quantidade, 0)

  return (
    <BrowserRouter>
      <Header totalItens={totalItens} />
      <main className="pagina">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/cardapio"
            element={<Cardapio onAdicionarCarrinho={adicionarCarrinho} />}
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
