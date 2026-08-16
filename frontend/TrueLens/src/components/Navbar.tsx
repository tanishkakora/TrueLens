import Name from "./Name";
import "./styles/Navbar.css";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

function Navbar() {
    return (
        <nav className="navbar">
            <Name />

            <div className="nav-links">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/prediction">Predict</Link>
                <Link to="/history">History</Link>
                <Link to="/about">About</Link>
                <Link to="/profile">
                    <CgProfile size={24} />
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;