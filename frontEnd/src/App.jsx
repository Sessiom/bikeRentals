import NavBar from "./components/NavBar"
import RentalList from "./components/RentalList"
import { getAvailableBikes } from "./Controllers/bikeController"
import { useState, useEffect } from "react"
import Login from "./components/Login"
import MyRentals from "./components/MyRentals"
import Admin from "./components/Admin"
import ErrorPage from "./components/ErrorPage"
import { getMyInfo } from "./Controllers/customerController"

function App() {
  const [userData, setUserData] = useState({});
  const [bikes, setBikes] = useState([]);
  const [myRentals, setMyRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('available-rentals') // Initialize tab to show available rentals
  const [isLoggedIn , setIsLoggedIn] = useState(false)
  
  // When page is loaded fetch bike and customer data if they are logged in
  useEffect(() => {

      async function fetchBikes() {
        try {
          const bikesData = await getAvailableBikes();
          setBikes(bikesData);
        } catch(error) {
          console.log("Error fetching bikes:", error)
        } finally {
          setLoading(false);
        }
      }

      async function fetchMyData() {
        try{
          const data = await getMyInfo()

          // When token expires log out customer
          if(data.message == 'Invalid token'){ 
            setIsLoggedIn(false);
            return
          }
          setUserData(data)
        } catch(err) {
          console.log(err)
        } 
      }
      fetchBikes();
      const token = localStorage.getItem('token')
      if(token) {
        fetchMyData()
        setIsLoggedIn(true);
      } 
  }, [])


  return (
    <>
      <NavBar selectedTab={selectedTab} myRentals={myRentals} setBikes={setBikes} userData={userData} setSelectedTab={setSelectedTab} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setMyRentals={setMyRentals}/>
      { selectedTab == 'sign-in' ? 
            <Login setUserData={setUserData} setSelectedTab={setSelectedTab} setIsLoggedIn={setIsLoggedIn}/> : 
        selectedTab == 'available-rentals' || selectedTab == 'all-rentals'?
            <RentalList isLoggedIn={isLoggedIn} bikes={bikes} setBikes={setBikes} setMyRentals={setMyRentals} myRentals={myRentals} loading={loading} setSelectedTab={setSelectedTab}/> : 
        selectedTab == 'my-rentals' ? 
            <MyRentals setBikes={setBikes} setMyRentals={setMyRentals} myRentals={myRentals}/> :
        selectedTab == 'admin' ? 
            <Admin userData={userData}/> : <ErrorPage/>}
    </>
  )
}

export default App
