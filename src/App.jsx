import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="pagina">
        <Routes>
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
