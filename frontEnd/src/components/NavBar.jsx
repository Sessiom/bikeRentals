export default function NavBar(props) {

    const { setSelectedTab }= props

    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand">Rex's Rentals</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">

                {/* Hide sign in if the user is already signed in*/}
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" onClick={() => setSelectedTab('sign-in')}>Sign In</a>
                </li>
                
                <li className="nav-item">
                <a className="nav-link" onClick={() => setSelectedTab('available-rentals')}>Available Rentals</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" onClick={() => setSelectedTab('my-rentals')}>My Rentals</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" onClick={() => setSelectedTab('admin')}>Admin</a>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    )
}