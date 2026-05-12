import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import './PedidoStatus.css'

function PedidoNegado() {
  const navigate = useNavigate()

  return (
    <div className="pedido-status negado">
      <span className="pedido-icone">❌</span>
      <h2>Pagamento não aprovado</h2>
      <p>Não conseguimos processar seu pagamento.</p>
      <p className="pedido-obs">Verifique os dados do cartão ou tente outra forma de pagamento.</p>

      <div className="pedido-acoes">
        <Button onClick={() => navigate('/pagamento')}>
          Tentar novamente
        </Button>
        <Button variante="secundario" onClick={() => navigate('/')}>
          Voltar ao início
        </Button>
      </div>
    </div>
  )
}

export default PedidoNegado
