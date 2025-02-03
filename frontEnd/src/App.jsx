import NavBar from "./components/NavBar"
import RentalList from "./components/RentalList"
import { useState, useEffect } from "react"
import Login from "./components/Login"
import MyRentals from "./components/MyRentals"
import Admin from "./components/Admin"
import ErrorPage from "./components/ErrorPage"
import { getMyInfo } from "./Controllers/customerController"
import { Routes, Route } from 'react-router'
import AddBikeForm from "./components/AddBikeForm"
import BikeList from "./components/BikeList"
import CustomerList from "./components/CustomerList"

function App() {
  const [userData, setUserData] = useState({});
  const [bikes, setBikes] = useState([]);
  const [myRentals, setMyRentals] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // When page is loaded fetch customer data if they are logged in
  useEffect(() => {
      async function fetchMyData() {
        try{
          const data = await getMyInfo()

          // When token expires log out customer
          if(data.message == 'Invalid token'){ 
            setIsLoggedIn(false);
            return
          }
          console.log(data)
          setIsLoggedIn(true);
          setUserData(data)
          setIsAdmin(data.is_admin)
        } catch(err) {
          console.log(err)
        } 
      }
      const token = localStorage.getItem('token')
      if(token) {
        fetchMyData()
      } 
  }, [])


  return (
    <>
      <NavBar myRentals={myRentals} setBikes={setBikes} userData={userData} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setMyRentals={setMyRentals} setIsAdmin={setIsAdmin}/>
        <Routes>
            <Route path="/" element={<RentalList isLoggedIn={isLoggedIn} bikes={bikes} setBikes={setBikes} setMyRentals={setMyRentals} myRentals={myRentals}/>}/>
            <Route path="/login" element={<Login setIsAdmin={setIsAdmin} setUserData={setUserData} setIsLoggedIn={setIsLoggedIn}/> }/> 
            <Route path="/myRentals" element={isLoggedIn ? <MyRentals setBikes={setBikes} setMyRentals={setMyRentals} myRentals={myRentals}/> : 
                                                           <Login setIsAdmin={setIsAdmin} setUserData={setUserData} setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path="/admin" element={isAdmin ? <Admin userData={userData}/>:
                                                    <ErrorPage />}>
            </Route>
            <Route path="*" element={<ErrorPage/>}/> 
        </Routes>
    </>
  )
}

export default App
