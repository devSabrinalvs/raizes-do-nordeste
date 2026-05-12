import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Button from '../components/Button'
import './Pagamento.css'

function Pagamento({ carrinho, onLimparCarrinho }) {
  const navigate = useNavigate()
  const [formaPagamento, setFormaPagamento] = useState('')
  const [erro, setErro] = useState('')

  const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0)

  function handleConfirmar() {
    if (!formaPagamento) {
      setErro('Selecione uma forma de pagamento.')
      return
    }
    navigate('/processando', { state: { formaPagamento, total } })
  }

  if (carrinho.length === 0) {
    return (
      <div className="pagamento-vazio">
        <p>Nenhum item no carrinho.</p>
        <Button onClick={() => navigate('/cardapio')}>Ir ao cardápio</Button>
      </div>
    )
  }

  return (
    <div className="pagamento">
      <h2>Pagamento</h2>

      <Card className="pagamento-resumo">
        <h3>Resumo do pedido</h3>
        {carrinho.map(item => (
          <div key={item.id} className="pagamento-item">
            <span>{item.quantidade}x {item.nome}</span>
            <span>R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
          </div>
        ))}
        <div className="pagamento-total">
          <span>Total</span>
          <span>R$ {total.toFixed(2).replace('.', ',')}</span>
        </div>
      </Card>

      <Card>
        <h3>Forma de pagamento</h3>
        <div className="pagamento-opcoes">
          {['pix', 'credito', 'debito'].map(op => (
            <label key={op} className={`pagamento-opcao ${formaPagamento === op ? 'selecionada' : ''}`}>
              <input
                type="radio"
                name="pagamento"
                value={op}
                checked={formaPagamento === op}
                onChange={() => { setFormaPagamento(op); setErro('') }}
              />
              <span>
                {op === 'pix' && '📱 PIX'}
                {op === 'credito' && '💳 Crédito'}
                {op === 'debito' && '💳 Débito'}
              </span>
            </label>
          ))}
        </div>

        {formaPagamento === 'pix' && (
          <div className="pagamento-pix">
            <p>Chave PIX: <strong>raizesnordeste@pix.com</strong></p>
            <p className="pagamento-obs">O pagamento será confirmado automaticamente.</p>
          </div>
        )}
      </Card>

      {erro && <p className="pagamento-erro">{erro}</p>}

      <Button onClick={handleConfirmar}>Confirmar pedido</Button>
    </div>
  )
}

export default Pagamento
