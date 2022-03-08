import { useState } from 'react'

// Routes
import { useParams } from 'react-router-dom'

// Styles
import './styles.css'

// Excluding undefined in useParams types to use as an object value
declare module 'react-router-dom' {
  export function useParams<
    P extends Record<string, string | undefined> = {
      [key: string]: string | undefined;
    }
  >(): P;
}

export function Environment () {
  // Getting Params
  const { environment } = useParams<{environment: 'gym' | 'pool' | 'partyroom' | 'sportscourt'}>()

  // States
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  // Translating
  const toPtBr = {
    gym: 'Academia',
    pool: 'Piscina',
    partyroom: 'Salão de Festas',
    sportscourt: 'Quadra'
  }

  return (
    <>
      <div id='head'>{toPtBr[environment]}</div>
      <div className='d-flex py-3 justify-content-center align-items-center'>
        <label htmlFor="datepicker" className='px-3'>Escolha a data:</label>
        <input
        type="date"
        name="datepicker"
        id="datepicker"
        className='form-control w-auto'
        value={date}
        onChange={(value) => setDate(value.target.value)}
        />
      </div>
    </>
  )
}
