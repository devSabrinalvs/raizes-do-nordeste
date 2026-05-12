import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Processando.css'

function Processando({ onLimparCarrinho }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { formaPagamento, total } = location.state || {}

  useEffect(() => {
    const timer = setTimeout(() => {
      // simula aprovação — PIX e débito aprovam sempre, crédito tem chance de negar
      const aprovado = formaPagamento !== 'credito' || Math.random() > 0.3
      if (aprovado) {
        onLimparCarrinho()
        navigate('/pedido-aprovado', { state: { formaPagamento, total } })
      } else {
        navigate('/pedido-negado')
      }
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="processando">
      <div className="processando-spinner"></div>
      <p>Processando pagamento...</p>
      <p className="processando-obs">Aguarde, não feche essa tela.</p>
    </div>
  )
}

export default Processando
