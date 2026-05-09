import './Badge.css'

function Badge({ texto, tipo = 'info' }) {
  return (
    <span className={`badge badge-${tipo}`}>
      {texto}
    </span>
  )
}

export default Badge
