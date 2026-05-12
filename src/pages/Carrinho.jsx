import { Link, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import './Carrinho.css'

function Carrinho({ carrinho, onRemover, onAlterar }) {
  const navigate = useNavigate()

  const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0)

  if (carrinho.length === 0) {
    return (
      <div className="carrinho-vazio">
        <p>🛒</p>
        <p>Seu carrinho está vazio</p>
        <Link to="/cardapio">
          <Button>Ver cardápio</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="carrinho">
      <h2>Meu Carrinho</h2>

      <div className="carrinho-lista">
        {carrinho.map(item => (
          <Card key={item.id} className="carrinho-item">
            <div className="carrinho-item-info">
              <span className="carrinho-item-nome">{item.nome}</span>
              <span className="carrinho-item-preco-unit">
                R$ {item.preco.toFixed(2).replace('.', ',')} cada
              </span>
            </div>

            <div className="carrinho-item-rodape">
              <div className="quantidade">
                <button onClick={() => onAlterar(item.id, -1)}>−</button>
                <span>{item.quantidade}</span>
                <button onClick={() => onAlterar(item.id, +1)}>+</button>
              </div>

              <span className="carrinho-item-subtotal">
                R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}
              </span>

              <button className="carrinho-remover" onClick={() => onRemover(item.id)}>
                🗑️
              </button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="carrinho-resumo">
        <div className="carrinho-resumo-linha">
          <span>Subtotal</span>
          <span>R$ {total.toFixed(2).replace('.', ',')}</span>
        </div>
        <div className="carrinho-resumo-linha carrinho-total">
          <span>Total</span>
          <span>R$ {total.toFixed(2).replace('.', ',')}</span>
        </div>
      </Card>

      <div className="carrinho-acoes">
        <Button variante="secundario" onClick={() => navigate('/cardapio')}>
          Continuar comprando
        </Button>
        <Button onClick={() => navigate('/pagamento')}>
          Ir para pagamento
        </Button>
      </div>
    </div>
  )
}

export default Carrinho
