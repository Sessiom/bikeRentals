import { getMyRentals } from "../Controllers/bikeControllers"
import MyRentals from "./MyRentals";

export default function NavBar(props) {

    const { myRentals, setSelectedTab, isLoggedIn, setIsLoggedIn, setMyRentals, userData }= props

    async function fetchMyRentals() {
        try {
          const rentalData = await getMyRentals();
          setMyRentals(rentalData);
        } catch(error) {
          console.log("Error fetching rentals:", error)
        } 
      }

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
                <a className="nav-link">{`${userData.email} id:${userData.customerId || userData.customer_id}`}</a>
                </li>: ""}

                {/* Hide sign in if the user is already signed in*/}
                {!isLoggedIn ?
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" onClick={() => setSelectedTab('sign-in')} style={{ cursor: 'pointer' }}>Sign In</a>
                </li>: 
                //Log out
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" onClick={() => {
                    localStorage.clear()
                    setIsLoggedIn(false)
                }} style={{ cursor: 'pointer' }}>Log out</a>
                </li>}
                
                <li className="nav-item">
                <a className="nav-link" onClick={() => setSelectedTab('available-rentals')} style={{ cursor: 'pointer' }}>Available Rentals</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" onClick={() => {
                    setSelectedTab('my-rentals')
                    // guard clause for api. Refresh page to check again
                    if(myRentals.length > 0) {return}
                    fetchMyRentals()
                    }} style={{ cursor: 'pointer' }}>My Rentals</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" onClick={() => setSelectedTab('admin')} style={{ cursor: 'pointer' }}>Admin</a>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    )
}