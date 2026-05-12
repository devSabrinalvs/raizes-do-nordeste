import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Cardapio from './pages/Cardapio'
import Carrinho from './pages/Carrinho'
import Pagamento from './pages/Pagamento'
import Processando from './pages/Processando'
import PedidoAprovado from './pages/PedidoAprovado'
import PedidoNegado from './pages/PedidoNegado'
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

  function alterarQuantidade(id, valor) {
    setCarrinho(prev => prev.map(i => {
      if (i.id !== id) return i
      const nova = i.quantidade + valor
      if (nova <= 0) return null
      return { ...i, quantidade: nova }
    }).filter(Boolean))
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
          <Route
            path="/carrinho"
            element={
              <Carrinho
                carrinho={carrinho}
                onRemover={removerCarrinho}
                onAlterar={alterarQuantidade}
              />
            }
          />
          <Route
            path="/pagamento"
            element={<Pagamento carrinho={carrinho} />}
          />
          <Route
            path="/processando"
            element={<Processando onLimparCarrinho={limparCarrinho} />}
          />
          <Route path="/pedido-aprovado" element={<PedidoAprovado />} />
          <Route path="/pedido-negado" element={<PedidoNegado />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
