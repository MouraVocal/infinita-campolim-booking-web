interface IPostCard {
  imageUrl?: string
  text: string
  id: string
}

export default function AdminPostCard ({ imageUrl, text, id }: IPostCard) {
  return (
    <>
      <div className="d-flex border rounded shadow-sm justify-content-space-around w-100 mb-2">
        <img src={imageUrl} className='p-2' alt="Imagem do Post" style={{ height: 100, width: 100 }} data-bs-toggle="modal" data-bs-target={`#modal${id}`} />
        <div className="text-break mb-2">
          {text}
        </div>
      </div>

    {/* Modal */}
      <div className="modal fade" id={`modal${id}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <img src={imageUrl} className='img-fluid rounded mx-auto d-block' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
