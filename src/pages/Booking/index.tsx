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

  const environmentArrays = [
    {
      src: Academia,
      title: 'Academia',
      path: 'gym'
    },
    {
      src: Piscina,
      title: 'Piscina',
      path: 'pool'
    },
    {
      src: Salao,
      title: 'Salão de Festas',
      path: 'partyroom'
    },
    {
      src: Quadra,
      title: 'Quadra',
      path: 'sportscourt'
    }

  ]
  return (
    <div className='container-fluid mb-3'>
      <h3 className='text-center my-4'>Por favor, escolha o ambiente</h3>
      <div className='d-flex flex-wrap align-items-center justify-content-center'>
        {
          environmentArrays.map((item) => {
            return (
              <div key={item.title} className='onclick' onClick={() => navigate(`/environments/${item.path}`)}>
                <EnviromentCard src={item.src} title={item.title} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
