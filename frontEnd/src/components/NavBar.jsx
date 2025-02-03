import { Link } from "react-router"
import { useNavigate } from "react-router"

export default function NavBar(props) {

    const { isLoggedIn, setIsLoggedIn, userData, setIsAdmin }= props
    const navigate = useNavigate();
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand">Rex's Rentals</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">

                {/* Display signed in user*/}
                {isLoggedIn ?
                <li className="nav-item">
                <a className="nav-link active">{`${userData.email} id:${userData.customer_id}`}</a>
                </li>: ""}

                {/* Hide sign in if the user is already signed in*/}
                {!isLoggedIn ?
                <li className="nav-item">
                <Link to="/login" className="nav-link" aria-current="login" >Login</Link>
                </li>: 
                // show Log out if user is signed in
                <li className="nav-item">
                <a className="nav-link" aria-current="" onClick={() => {
                    localStorage.clear()
                    setIsLoggedIn(false)
                    setIsAdmin(false)
                    navigate("/")
                }} style={{ cursor: 'pointer' }}>Log out</a>
                </li>}

                <li className="nav-item">
                <Link to="/" className="nav-link" aria-current="view rentals">View rentals</Link>
                </li>

                {isLoggedIn ?
                <li className="nav-item">
                <Link to="/myRentals" className="nav-link">My Rentals</Link>
                </li>: ""}

                <li className="nav-item">
                <Link to="/admin" className="nav-link" >Admin</Link>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    )
}