import { getAllBikes, getAvailableBikes, getMyRentals } from "../Controllers/bikeControllers"

export default function NavBar(props) {

    const { selectedTab, setBikes, setMyRentals, setSelectedTab, isLoggedIn, setIsLoggedIn, userData }= props

    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" style={{ cursor: 'pointer' }}>Rex's Rentals</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">

                {/* Display signed in user*/}
                {isLoggedIn ?
                <li className="nav-item">
                <a className="nav-link active">{`${userData.email} id:${userData.customerId || userData.customer_id}`}</a>
                </li>: ""}

                {/* Hide sign in if the user is already signed in*/}
                {!isLoggedIn ?
                <li className="nav-item">
                <a className="nav-link" aria-current="page" onClick={() => setSelectedTab('sign-in')} style={{ cursor: 'pointer' }}>Sign In</a>
                </li>: 
                // show Log out if user is signed in
                <li className="nav-item">
                <a className="nav-link" aria-current="page" onClick={() => {
                    localStorage.clear()
                    setIsLoggedIn(false)
                }} style={{ cursor: 'pointer' }}>Log out</a>
                </li>}
                
                <li className="nav-item">
                <a className={selectedTab == 'all-rentals' ? "nav-link text-success" :"nav-link" } onClick={async() => {
                    setSelectedTab('all-rentals')
                    setBikes(await getAllBikes())
                    }} style={{ cursor: 'pointer' }}>All Rentals</a>
                </li>

                <li className="nav-item">
                <a className={selectedTab == 'available-rentals' ? "nav-link text-success" :"nav-link" } onClick={async() => {
                    setSelectedTab('available-rentals')
                    setBikes(await getAvailableBikes())
                    }} style={{ cursor: 'pointer' }}>Available Rentals</a>
                </li>

                {isLoggedIn ?
                <li className="nav-item">
                <a className={selectedTab == 'my-rentals' ? "nav-link text-success" :"nav-link" } onClick={async() => {
                    setSelectedTab('my-rentals')
                    setMyRentals(await getMyRentals())
                    }} style={{ cursor: 'pointer' }}>My Rentals</a>
                </li>: ""}

                <li className="nav-item">
                <a className={selectedTab == 'admin' ? "nav-link text-success" :"nav-link" } onClick={() => setSelectedTab('admin')} style={{ cursor: 'pointer' }}>Admin</a>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    )
}