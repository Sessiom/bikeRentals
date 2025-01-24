import NavBar from "./components/NavBar"
import RentalList from "./components/RentalList"
import { getBikes } from "./Controllers/bikeControllers"
import { useState, useEffect } from "react"
import Login from "./components/Login"

function App() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('login')
  
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
  }, [])



  return (
    <>
      <NavBar />
      { selectedTab == 'login' ? <Login/> : 
      <RentalList loading={loading} bikes={bikes}/>}
    </>
  )
}

export default App
