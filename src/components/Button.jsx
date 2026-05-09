import './Button.css'

function Button({ children, variante = 'primario', onClick, type = 'button', desabilitado = false }) {
  return (
    <button
      type={type}
      className={`btn btn-${variante}`}
      onClick={onClick}
      disabled={desabilitado}
    >
      {children}
    </button>
  )
}

export default Button
