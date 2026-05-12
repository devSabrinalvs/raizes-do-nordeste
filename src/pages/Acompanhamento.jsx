import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Badge from '../components/Badge'
import Button from '../components/Button'
import pedidos from '../data/pedidos.json'
import './Acompanhamento.css'

const statusLabel = {
  em_preparo: 'Em preparo',
  entregue: 'Entregue',
  cancelado: 'Cancelado',
  aguardando: 'Aguardando'
}

const statusTipo = {
  em_preparo: 'alerta',
  entregue: 'sucesso',
  cancelado: 'erro',
  aguardando: 'info'
}

const etapas = ['Pedido recebido', 'Em preparo', 'Pronto', 'Entregue']

function getEtapaAtual(status) {
  if (status === 'entregue') return 4
  if (status === 'em_preparo') return 2
  return 1
}

function Acompanhamento() {
  const navigate = useNavigate()
  const pedidoAtivo = pedidos.find(p => p.status === 'em_preparo')
  const historico = pedidos.filter(p => p.status === 'entregue')

  return (
    <div className="acomp">
      <h2>Acompanhamento</h2>

      {pedidoAtivo ? (
        <section className="acomp-secao">
          <h3>Pedido em andamento</h3>
          <Card className="acomp-ativo">
            <div className="acomp-cabecalho">
              <span className="acomp-numero">Pedido #{pedidoAtivo.id}</span>
              <Badge texto={statusLabel[pedidoAtivo.status]} tipo={statusTipo[pedidoAtivo.status]} />
            </div>

            <div className="acomp-itens">
              {pedidoAtivo.itens.map(item => (
                <p key={item.produtoId}>{item.quantidade}x {item.nome}</p>
              ))}
            </div>

            <div className="acomp-progresso">
              {etapas.map((etapa, i) => {
                const etapaAtual = getEtapaAtual(pedidoAtivo.status)
                const concluida = i + 1 < etapaAtual
                const atual = i + 1 === etapaAtual
                return (
                  <div key={i} className={`acomp-etapa ${concluida ? 'concluida' : ''} ${atual ? 'atual' : ''}`}>
                    <div className="acomp-bolinha">{concluida ? '✓' : i + 1}</div>
                    <span>{etapa}</span>
                  </div>
                )
              })}
            </div>

            <p className="acomp-canal">Canal: {pedidoAtivo.canal} · Pagamento: {pedidoAtivo.pagamento}</p>
          </Card>
        </section>
      ) : (
        <Card className="acomp-sem-pedido">
          <p>Nenhum pedido em andamento no momento.</p>
          <Button onClick={() => navigate('/cardapio')}>Fazer um pedido</Button>
        </Card>
      )}

      {historico.length > 0 && (
        <section className="acomp-secao">
          <h3>Histórico</h3>
          <div className="acomp-historico">
            {historico.map(pedido => (
              <Card key={pedido.id} className="acomp-historico-item">
                <div className="acomp-cabecalho">
                  <span className="acomp-numero">Pedido #{pedido.id}</span>
                  <Badge texto={statusLabel[pedido.status]} tipo={statusTipo[pedido.status]} />
                </div>
                <div className="acomp-itens">
                  {pedido.itens.map(item => (
                    <p key={item.produtoId}>{item.quantidade}x {item.nome}</p>
                  ))}
                </div>
                <div className="acomp-rodape">
                  <span>Total: <strong>R$ {pedido.total.toFixed(2).replace('.', ',')}</strong></span>
                  <span className="acomp-data">{new Date(pedido.dataPedido).toLocaleDateString('pt-BR')}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default Acompanhamento
