import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Badge from '../components/Badge'
import Button from '../components/Button'
import cardapio from '../data/cardapio.json'
import categorias from '../data/categorias.json'
import './Totem.css'

function Totem() {
  const navigate = useNavigate()
  const [etapa, setEtapa] = useState('inicio') // inicio | cardapio | carrinho | pagamento | confirmado
  const [categoriaAtiva, setCategoriaAtiva] = useState(null)
  const [carrinho, setCarrinho] = useState([])
  const [formaPagamento, setFormaPagamento] = useState('')

  const itensFiltrados = categoriaAtiva
    ? cardapio.filter(i => i.categoriaId === categoriaAtiva && i.disponivel)
    : cardapio.filter(i => i.disponivel)

  const total = carrinho.reduce((acc, i) => acc + i.preco * i.quantidade, 0)
  const totalItens = carrinho.reduce((acc, i) => acc + i.quantidade, 0)

  function adicionarItem(item) {
    setCarrinho(prev => {
      const existe = prev.find(i => i.id === item.id)
      if (existe) return prev.map(i => i.id === item.id ? { ...i, quantidade: i.quantidade + 1 } : i)
      return [...prev, { ...item, quantidade: 1 }]
    })
  }

  function removerItem(id) {
    setCarrinho(prev => prev.map(i => i.id === id ? { ...i, quantidade: i.quantidade - 1 } : i).filter(i => i.quantidade > 0))
  }

  function confirmarPagamento() {
    setEtapa('confirmado')
    setTimeout(() => {
      setCarrinho([])
      setFormaPagamento('')
      setEtapa('inicio')
    }, 4000)
  }

  if (etapa === 'inicio') {
    return (
      <div className="totem totem-inicio">
        <h1>🌵 Raízes do Nordeste</h1>
        <p>Toque para começar seu pedido</p>
        <button className="totem-btn-inicio" onClick={() => setEtapa('cardapio')}>
          Fazer Pedido
        </button>
      </div>
    )
  }

  if (etapa === 'confirmado') {
    return (
      <div className="totem totem-confirmado">
        <span>✅</span>
        <h2>Pedido confirmado!</h2>
        <p>Retire seu pedido no balcão.</p>
        <p className="totem-obs">A tela será reiniciada em instantes...</p>
      </div>
    )
  }

  if (etapa === 'pagamento') {
    return (
      <div className="totem totem-pagamento">
        <h2>Pagamento</h2>

        <div className="totem-resumo">
          {carrinho.map(item => (
            <div key={item.id} className="totem-resumo-linha">
              <span>{item.quantidade}x {item.nome}</span>
              <span>R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
            </div>
          ))}
          <div className="totem-resumo-total">
            <span>Total</span>
            <span>R$ {total.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>

        <h3>Escolha a forma de pagamento</h3>
        <div className="totem-pagamento-opcoes">
          {['pix', 'credito', 'debito'].map(op => (
            <button
              key={op}
              className={`totem-pagamento-btn ${formaPagamento === op ? 'selecionado' : ''}`}
              onClick={() => setFormaPagamento(op)}
            >
              {op === 'pix' && '📱 PIX'}
              {op === 'credito' && '💳 Crédito'}
              {op === 'debito' && '💳 Débito'}
            </button>
          ))}
        </div>

        <div className="totem-acoes">
          <button className="totem-btn-voltar" onClick={() => setEtapa('carrinho')}>← Voltar</button>
          <button
            className="totem-btn-confirmar"
            disabled={!formaPagamento}
            onClick={confirmarPagamento}
          >
            Confirmar
          </button>
        </div>
      </div>
    )
  }

  if (etapa === 'carrinho') {
    return (
      <div className="totem totem-carrinho">
        <h2>Meu Pedido</h2>

        {carrinho.length === 0 ? (
          <p className="totem-vazio">Nenhum item adicionado ainda.</p>
        ) : (
          <div className="totem-lista-carrinho">
            {carrinho.map(item => (
              <div key={item.id} className="totem-carrinho-item">
                <span className="totem-carrinho-nome">{item.nome}</span>
                <div className="totem-qtd">
                  <button onClick={() => removerItem(item.id)}>−</button>
                  <span>{item.quantidade}</span>
                  <button onClick={() => adicionarItem(item)}>+</button>
                </div>
                <span>R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
              </div>
            ))}
            <div className="totem-carrinho-total">
              <span>Total</span>
              <span>R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>
        )}

        <div className="totem-acoes">
          <button className="totem-btn-voltar" onClick={() => setEtapa('cardapio')}>← Cardápio</button>
          <button
            className="totem-btn-confirmar"
            disabled={carrinho.length === 0}
            onClick={() => setEtapa('pagamento')}
          >
            Pagar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="totem totem-cardapio">
      <div className="totem-header">
        <span className="totem-logo">🌵 Raízes do Nordeste</span>
        <button className="totem-carrinho-btn" onClick={() => setEtapa('carrinho')}>
          🛒 {totalItens > 0 && <span className="totem-badge">{totalItens}</span>}
          {totalItens > 0 ? `R$ ${total.toFixed(2).replace('.', ',')}` : 'Carrinho'}
        </button>
      </div>

      <div className="totem-filtros">
        <button className={!categoriaAtiva ? 'totem-filtro ativo' : 'totem-filtro'} onClick={() => setCategoriaAtiva(null)}>Todos</button>
        {categorias.map(cat => (
          <button
            key={cat.id}
            className={categoriaAtiva === cat.id ? 'totem-filtro ativo' : 'totem-filtro'}
            onClick={() => setCategoriaAtiva(cat.id)}
          >
            {cat.nome}
          </button>
        ))}
      </div>

      <div className="totem-itens">
        {itensFiltrados.map(item => (
          <div key={item.id} className="totem-item">
            <div className="totem-item-info">
              <span className="totem-item-nome">{item.nome}</span>
              <span className="totem-item-desc">{item.descricao}</span>
              <span className="totem-item-preco">R$ {item.preco.toFixed(2).replace('.', ',')}</span>
            </div>
            <button className="totem-adicionar" onClick={() => adicionarItem(item)}>
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Totem
