import { useNavigate, useLocation } from 'react-router-dom'
import Button from '../components/Button'
import './PedidoStatus.css'

function PedidoAprovado() {
  const navigate = useNavigate()
  const location = useLocation()
  const { total } = location.state || {}

  return (
    <div className="pedido-status aprovado">
      <span className="pedido-icone">✅</span>
      <h2>Pedido confirmado!</h2>
      <p>Seu pagamento foi aprovado com sucesso.</p>
      {total && (
        <p className="pedido-total">
          Total pago: <strong>R$ {total.toFixed(2).replace('.', ',')}</strong>
        </p>
      )}
      <p className="pedido-obs">Acompanhe o status do seu pedido abaixo.</p>

      <div className="pedido-acoes">
        <Button onClick={() => navigate('/acompanhamento')}>
          Acompanhar pedido
        </Button>
        <Button variante="secundario" onClick={() => navigate('/')}>
          Voltar ao início
        </Button>
      </div>
    </div>
  )
}

export default PedidoAprovado
