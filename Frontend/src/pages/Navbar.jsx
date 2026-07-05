import { Link } from 'react-router-dom';
import './css/Navbar.css';
import nots from '../assets/bell.png';
import profile from '../assets/profile.png';
import home from '../assets/home.png';
import lista from '../assets/lista.png';

function Navbar() {
  return (
    <nav className="barra-inferior">
      <Link to="/" className="btn-nav">
       <img src={home} alt="home" className='btn-nav-icone' />
      </Link>
      
      <Link to="/documentos" className="btn-nav">
      <img src={lista} alt="home" className='btn-nav-icone' />
      </Link>
      
      <Link to="/notificacoes" className="btn-nav">
       <img src={nots} alt="home" className='btn-nav-icone' />
      </Link>
      
      <Link to="/perfil" className="btn-nav">
      <img src={profile} alt="home" className='btn-nav-icone' />
      </Link>
    </nav>
  );
}

export default Navbar;