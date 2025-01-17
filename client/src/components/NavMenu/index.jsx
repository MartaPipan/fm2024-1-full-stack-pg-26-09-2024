import { NavLink } from 'react-router-dom';    

const NavMenu = () => {
    return <nav>
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/">User Register</NavLink>
            </li> 
        </ul>
    </nav>;
}

export default NavMenu;