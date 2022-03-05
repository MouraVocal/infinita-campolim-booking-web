import icon from '../../assets/icon.png'
import { styles } from './styles'

interface NavbarProps {
	auth?: boolean
}

export const Navbar = ({ auth = false }: NavbarProps): JSX.Element => {
  return (
		<nav className="navbar navbar-expand-sm navbar-light bg-light">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">
					<img src={icon} alt="infinita campolim logo" style={styles.icon} />
				</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						{auth
						  ? (
								<>
									<li className="nav-item">
										<a className="nav-link" aria-current="page" href="/">Fazer Login</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="signup">Cadastrar-se</a>
									</li>
								</>
						    )
						  : (
								<>
									<li className="nav-item">
										<a className="nav-link" aria-current="page" href="/dashboard">Painel de Controle</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="book">Agendar</a>
									</li>
								</>
						    )
						}
					</ul>
				</div>
			</div>
		</nav>
  )
}
