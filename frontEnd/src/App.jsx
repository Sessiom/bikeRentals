import NavBar from "./components/NavBar"
import RentalList from "./components/RentalList"
import { getBikes } from "./Controllers/bikeControllers"
import { useState, useEffect } from "react"
import { login } from "./Controllers/authControllers"
import Login from "./components/Login"
import MyRentals from "./components/MyRentals"

function App() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('available-rentals')
  const [isLoggedIn , setIsLoggedIn] = useState(false)
  
  
  useEffect(() => {
      async function fetchBikes() {
        try {
          const bikesData = await getBikes();
          setBikes(bikesData);
        } catch(error) {
          console.log("Error fetching bikes:", error)
        } finally {
          setLoading(false);
        }
      }
      fetchBikes();
      const token = localStorage.getItem('token')
      if(token) {
        setIsLoggedIn(true);
      }
  }, [])



  return (
    <>
      <NavBar setSelectedTab={setSelectedTab} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      { selectedTab == 'sign-in' ? <Login setSelectedTab={setSelectedTab} setIsLoggedIn={setIsLoggedIn}/> : selectedTab == 'available-rentals' ?
      <RentalList loading={loading} bikes={bikes} /> : <MyRentals/>}
    </>
  )
}

export default App
