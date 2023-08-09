import { NavLink, Link } from "react-router-dom"
import CartWidget from "../CartWidget/CartWidget"
import './NavBar.css'

const NavBar = () => {

    return (
        <header>
            <Link to={"/"}>
                <img src="../../public/logo.png" alt="Bishoujo Vibes" />
            </Link>

            <nav>
                <ul>
                    <li>
                        <NavLink to={"/categoria/1"}> Remeras </NavLink>
                    </li>

                    <li>
                        <NavLink to={"/categoria/2"}> Pantalones </NavLink>
                    </li>

                    <li>
                        <NavLink to={"/categoria/3"}> Buzos </NavLink>
                    </li>

                </ul>
            </nav>

            <CartWidget />

        </header>
    )
}

export default NavBar