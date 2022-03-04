import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Routes } from './routes/'

function App () {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </>
  )
}

export default App
