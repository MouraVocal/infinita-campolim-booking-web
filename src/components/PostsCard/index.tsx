interface IPostCard {
  imageUrl?: string
  text: string
}

export default function PostCard ({ imageUrl, text }: IPostCard) {
  return (
    <div className="d-flex border rounded shadow-sm justify-content-space-around w-100 mb-2">
      <img src={imageUrl} className='p-2' alt="Imagem do Post" style={{ height: 100, width: 100 }} />
      <div className="text-break mb-2">
        {text}
      </div>
    </div>
  )
}
