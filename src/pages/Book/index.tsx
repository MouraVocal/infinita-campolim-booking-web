// Assets
import { EnviromentCard } from '../../components/EnviromentCard'

import Academia from '../../assets/academia.jpeg'
import Piscina from '../../assets/piscina.jpeg'
import Salao from '../../assets/salao.jpg'
import Quadra from '../../assets/quadra.jpeg'

export const Book: React.FC = () => {
  return (
    <div className='container-fluid'>
      <h3 className='text-center'>Escolha onde você quer agendar</h3>
      <div className='d-flex flex-wrap align-items-center justify-content-center'>
        <EnviromentCard src={Academia} title='Academia' />
        <EnviromentCard src={Piscina} title='Piscina' />
        <EnviromentCard src={Salao} title='Salão de Festas' />
        <EnviromentCard src={Quadra} title='Quadra' />
      </div>
    </div>
  )
}
