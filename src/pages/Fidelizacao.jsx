import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Badge from '../components/Badge'
import Button from '../components/Button'
import usuario from '../data/usuario.json'
import pedidos from '../data/pedidos.json'
import './Fidelizacao.css'

const niveis = [
  { nome: 'Bronze', minimo: 0, maximo: 199 },
  { nome: 'Prata', minimo: 200, maximo: 499 },
  { nome: 'Ouro', minimo: 500, maximo: 999 }
]

function getNivelAtual(pontos) {
  return niveis.findLast(n => pontos >= n.minimo) || niveis[0]
}

function getProximoNivel(pontos) {
  return niveis.find(n => pontos < n.minimo) || null
}

function Fidelizacao() {
  const navigate = useNavigate()
  const { pontosFidelidade, nome, nivel } = usuario
  const nivelAtual = getNivelAtual(pontosFidelidade)
  const proximoNivel = getProximoNivel(pontosFidelidade)
  const pontosParaProximo = proximoNivel ? proximoNivel.minimo - pontosFidelidade : 0
  const progresso = proximoNivel
    ? ((pontosFidelidade - nivelAtual.minimo) / (proximoNivel.minimo - nivelAtual.minimo)) * 100
    : 100

  const pedidosComPontos = pedidos.filter(p => p.pontosCreditados > 0)

  return (
    <div className="fidel">
      <h2>Programa de Fidelidade</h2>

      <Card className="fidel-perfil">
        <div className="fidel-perfil-topo">
          <div>
            <p className="fidel-nome">{nome}</p>
            <Badge texto={`Nível ${nivelAtual.nome}`} tipo="alerta" />
          </div>
          <div className="fidel-pontos-box">
            <span className="fidel-pontos-num">{pontosFidelidade}</span>
            <span className="fidel-pontos-label">pontos</span>
          </div>
        </div>

        {proximoNivel ? (
          <div className="fidel-progresso-container">
            <div className="fidel-progresso-info">
              <span>{nivelAtual.nome}</span>
              <span>{proximoNivel.nome}</span>
            </div>
            <div className="fidel-barra">
              <div className="fidel-barra-fill" style={{ width: `${progresso}%` }}></div>
            </div>
            <p className="fidel-faltam">
              Faltam <strong>{pontosParaProximo} pontos</strong> para o nível {proximoNivel.nome}
            </p>
          </div>
        ) : (
          <p className="fidel-maximo">🏆 Você está no nível máximo!</p>
        )}
      </Card>

      <Card className="fidel-como-ganhar">
        <h3>Como ganhar pontos</h3>
        <ul>
          <li>🍽️ A cada R$ 1,00 gasto = <strong>1 ponto</strong></li>
          <li>📱 Pedidos pelo app = <strong>pontos em dobro</strong></li>
          <li>⭐ Avaliar um pedido = <strong>5 pontos extras</strong></li>
        </ul>
      </Card>

      <section className="fidel-secao">
        <h3>Extrato de pontos</h3>
        <div className="fidel-extrato">
          {pedidosComPontos.map(pedido => (
            <Card key={pedido.id} className="fidel-extrato-item">
              <div className="fidel-extrato-linha">
                <div>
                  <p className="fidel-extrato-titulo">Pedido #{pedido.id}</p>
                  <p className="fidel-extrato-data">
                    {new Date(pedido.dataPedido).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <span className="fidel-pontos-credito">+{pedido.pontosCreditados} pts</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Button variante="secundario" onClick={() => navigate('/')}>
        Voltar ao início
      </Button>
    </div>
  )
}

export default Fidelizacao
