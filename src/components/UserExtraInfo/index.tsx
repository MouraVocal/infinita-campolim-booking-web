import { DocumentData } from 'firebase/firestore'

export function UserExtraInfo ({ user }: DocumentData) {
  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            Mais informações
          </button>
        </h2>
        <div id="collapseOne" className="accordion-collapse collapse hidden" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            <div>Apartamento: {user.apt}</div>
            <div>Torre: {user.tower}</div>
            <div>Telefone: {user.tel}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
