import './header.css';
import { Link } from 'react-router-dom';


const Header = () => {
    return(
        <header>
            <Link className="logo" to="/">Prime Flix</Link>
            <Link className="favoritos" to="/favoritos"><b>Meus favoritos</b></Link>
        </header>
    )
}

export default Header;