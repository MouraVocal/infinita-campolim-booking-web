interface EnvironmentCardProps {
  src: string;
  title: string;
}

export function EnviromentCard ({ src, title }: EnvironmentCardProps) {
  return (
    <div className='align-items-center'>
    <h6 className="text-center">{title}</h6>
    <div className='container'>
      <img className="rounded" src={src} alt={`foto ${title}`} />
    </div>
    </div>
  )
}
