import { Link } from 'react-router-dom'
import Card from '../components/Card'
import Badge from '../components/Badge'
import Button from '../components/Button'
import unidades from '../data/unidades.json'
import promocoes from '../data/promocoes.json'
import './Home.css'

function Home() {
  const promocoesAtivas = promocoes.filter(p => p.ativa)

  return (
    <div className="home">

      <section className="home-banner">
        <h1>🌵 Raízes do Nordeste</h1>
        <p>Sabor autêntico do Nordeste, pertinho de você</p>
        <Link to="/cardapio">
          <Button>Ver Cardápio</Button>
        </Link>
      </section>

      {promocoesAtivas.length > 0 && (
        <section className="home-secao">
          <h2>Promoções</h2>
          <div className="home-lista">
            {promocoesAtivas.map(promo => (
              <Card key={promo.id} className="home-promo-card">
                <Badge texto="Promoção" tipo="alerta" />
                <h3>{promo.titulo}</h3>
                <p>{promo.descricao}</p>
                <p className="home-desconto">
                  {promo.tipo === 'percentual'
                    ? `${promo.desconto}% de desconto`
                    : `R$ ${promo.desconto.toFixed(2)} de desconto`}
                </p>
              </Card>
            ))}
          </div>
        </section>
      )}

      <section className="home-secao">
        <h2>Nossas Unidades</h2>
        <div className="home-lista">
          {unidades.map(u => (
            <Card key={u.id} className="home-unidade-card">
              <div className="home-unidade-topo">
                <span className="home-unidade-nome">{u.nome}</span>
                <Badge
                  texto={u.aberta ? 'Aberta' : 'Fechada'}
                  tipo={u.aberta ? 'sucesso' : 'erro'}
                />
              </div>
              <p>{u.cidade} — {u.estado}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="home-secao home-categorias">
        <h2>O que você quer pedir?</h2>
        <div className="home-lista">
          <Link to="/cardapio?categoria=1">
            <Card className="home-cat-card">
              <span>🍽️</span>
              <p>Pratos</p>
            </Card>
          </Link>
          <Link to="/cardapio?categoria=2">
            <Card className="home-cat-card">
              <span>🥤</span>
              <p>Bebidas</p>
            </Card>
          </Link>
          <Link to="/cardapio?categoria=3">
            <Card className="home-cat-card">
              <span>🍰</span>
              <p>Doces</p>
            </Card>
          </Link>
        </div>
      </section>

    </div>
  )
}

export default Home
