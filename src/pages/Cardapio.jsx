import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Card from '../components/Card'
import Badge from '../components/Badge'
import Button from '../components/Button'
import cardapio from '../data/cardapio.json'
import categorias from '../data/categorias.json'
import './Cardapio.css'

function Cardapio({ onAdicionarCarrinho }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoriaAtiva = searchParams.get('categoria') ? Number(searchParams.get('categoria')) : null

  const [quantidade, setQuantidade] = useState({})

  const itensFiltrados = categoriaAtiva
    ? cardapio.filter(item => item.categoriaId === categoriaAtiva)
    : cardapio

  function getQuantidade(id) {
    return quantidade[id] || 1
  }

  function alterarQuantidade(id, valor) {
    const nova = Math.max(1, (quantidade[id] || 1) + valor)
    setQuantidade({ ...quantidade, [id]: nova })
  }

  function handleAdicionar(item) {
    if (onAdicionarCarrinho) {
      onAdicionarCarrinho(item, getQuantidade(item.id))
    }
  }

  return (
    <div className="cardapio">
      <h2>Cardápio</h2>

      <div className="cardapio-filtros">
        <button
          className={!categoriaAtiva ? 'filtro ativo' : 'filtro'}
          onClick={() => setSearchParams({})}
        >
          Todos
        </button>
        {categorias.map(cat => (
          <button
            key={cat.id}
            className={categoriaAtiva === cat.id ? 'filtro ativo' : 'filtro'}
            onClick={() => setSearchParams({ categoria: cat.id })}
          >
            {cat.nome}
          </button>
        ))}
      </div>

      <div className="cardapio-lista">
        {itensFiltrados.map(item => (
          <Card key={item.id} className={`cardapio-item ${!item.disponivel ? 'indisponivel' : ''}`}>
            <div className="cardapio-item-topo">
              <span className="cardapio-item-nome">{item.nome}</span>
              <div className="cardapio-badges">
                {item.sazonal && <Badge texto="Sazonal" tipo="sazonal" />}
                {!item.disponivel && <Badge texto="Indisponível" tipo="erro" />}
              </div>
            </div>

            <p className="cardapio-item-desc">{item.descricao}</p>

            <div className="cardapio-item-rodape">
              <span className="cardapio-item-preco">
                R$ {item.preco.toFixed(2).replace('.', ',')}
              </span>

              {item.disponivel && (
                <div className="cardapio-item-acoes">
                  <div className="quantidade">
                    <button onClick={() => alterarQuantidade(item.id, -1)}>−</button>
                    <span>{getQuantidade(item.id)}</span>
                    <button onClick={() => alterarQuantidade(item.id, +1)}>+</button>
                  </div>
                  <Button variante="primario" onClick={() => handleAdicionar(item)}>
                    Adicionar
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Cardapio
