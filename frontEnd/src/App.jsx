import NavBar from "./components/NavBar"
import RentalList from "./components/RentalList"
import { getAvailableBikes } from "./Controllers/bikeControllers"
import { useState, useEffect } from "react"
import Login from "./components/Login"
import MyRentals from "./components/MyRentals"
import Admin from "./components/admin"

function App() {
  const [userData, setUserData] = useState({});
  const [bikes, setBikes] = useState([]);
  const [myRentals, setMyRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('available-rentals')
  const [isLoggedIn , setIsLoggedIn] = useState(false)
  
  
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
          const res = await fetch(`${import.meta.env.VITE_API_URL}/customer/myInfo`,
            {
              headers: {
                'Authorization': token
              }})
          const data = await res.json()
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
      } else {
        setIsLoggedIn(false);
      }
  }, [])


  return (
    <>
      <NavBar selectedTab={selectedTab} myRentals={myRentals} setBikes={setBikes} userData={userData} setSelectedTab={setSelectedTab} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setMyRentals={setMyRentals}/>
      { selectedTab == 'sign-in' ? 
            <Login setUserData={setUserData} setSelectedTab={setSelectedTab} setIsLoggedIn={setIsLoggedIn}/> : 
        selectedTab == 'available-rentals' || selectedTab == 'all-rentals'?
            <RentalList bikes={bikes} setBikes={setBikes} setMyRentals={setMyRentals} myRentals={myRentals} loading={loading}/> : 
        selectedTab == 'my-rentals' ? 
            <MyRentals setBikes={setBikes} setMyRentals={setMyRentals} myRentals={myRentals}/> :
        selectedTab == 'admin' ? 
            <Admin /> : ""}
    </>
  )
}

export default App
