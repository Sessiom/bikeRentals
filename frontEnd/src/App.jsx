import NavBar from "./components/NavBar"
import RentalList from "./components/RentalList"
import { getBikes } from "./Controllers/bikeControllers"
import { useState, useEffect } from "react"
import { login } from "./Controllers/authControllers"
import Login from "./components/Login"
import MyRentals from "./components/MyRentals"

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
          const bikesData = await getBikes();
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
      }
  }, [])



  return (
    <>
      <NavBar userData={userData} setSelectedTab={setSelectedTab} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setMyRentals={setMyRentals}/>
      { selectedTab == 'sign-in' ? <Login setUserData={setUserData}setSelectedTab={setSelectedTab} setIsLoggedIn={setIsLoggedIn}/> : selectedTab == 'available-rentals' ?
      <RentalList loading={loading} bikes={bikes} /> : <MyRentals myRentals={myRentals}/>}
    </>
  )
}

export default App
