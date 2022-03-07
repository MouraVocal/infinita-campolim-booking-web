// Routes
import { useNavigate } from 'react-router-dom'

// Components
import { EnviromentCard } from '../../components/EnviromentCard'

// Assets
import Academia from '../../assets/academia.jpeg'
import Piscina from '../../assets/piscina.jpeg'
import Salao from '../../assets/salao.jpg'
import Quadra from '../../assets/quadra.jpeg'

// Styles
import './styles.css'

export const Booking: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className='container-fluid mb-3'>
      <h3 className='text-center'>Escolha onde você quer agendar</h3>
      <div className='d-flex flex-wrap align-items-center justify-content-center'>
        <div className='onclick' onClick={() => navigate('/environments/gym')}>
          <EnviromentCard src={Academia} title='Academia' />
        </div>
        <div className='onclick' onClick={() => navigate('/environments/pool')}>
          <EnviromentCard src={Piscina} title='Piscina' />
        </div>
        <div className='onclick' onClick={() => navigate('/environments/partyroom')}>
          <EnviromentCard src={Salao} title='Salão de Festas' />
        </div>
        <div className='onclick' onClick={() => navigate('/environments/sportscourt')}>
          <EnviromentCard src={Quadra} title='Quadra' />
        </div>
      </div>
    </div>
  )
}
