import {getAllCustomers}from "../Controllers/adminController"
import { useState, useEffect } from 'react'
import CustomerList from "./CustomerList"
import AddBikeForm from "./AddBikeForm"
import RentalManager from "./RentalManager"
import BikeList from "./BikeList"
import { getAllBikes } from "../Controllers/bikeController"

export default function Admin(props) {
    const { userData } = props
    const [ customers, setCustomers] = useState([])
    const [ bikes, setBikes] = useState([])
    const [ rentalData, setRentalData] = useState([])
    const [ selectedTab, setSelectedTab] = useState("customer-list")

    useEffect( () => {

        async function loadCustomers() {
            const customers = await getAllCustomers()
            setCustomers(customers)
        }
        loadCustomers()
    }, [])

    return(
        <>
        <ul className="nav justify-content-center">
        <li className="nav-item">
            <a className="nav-link active" style={{ cursor: 'pointer' }} onClick={async () => {
                const customers = await getAllCustomers()
                setCustomers(customers)
                setSelectedTab("customer-list")
            }}>Customers list</a>
        </li>
        <li className="nav-item">
            <a className="nav-link active" style={{ cursor: 'pointer' }} onClick={async () => {
                const bikes = await getAllBikes()
                setBikes(bikes)
                setSelectedTab("bike-manager")
            }}>Bike list</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" style={{ cursor: 'pointer' }} onClick={ () => setSelectedTab("add-new-bike")}>Add new bike</a>
        </li>
        </ul>

        <div className="container mt-3">
        <div className="row justify-content-center"> 
            {selectedTab == "customer-list" ? <CustomerList setRentalData={setRentalData} setSelectedTab={setSelectedTab} userData={userData} customers={customers} setCustomers={setCustomers}/> : 
            selectedTab == "add-new-bike" ? <AddBikeForm /> : 
            selectedTab == "rental-manager" ? <RentalManager setRentalData={setRentalData} rentalData={rentalData}/>:
            selectedTab == "bike-manager"? <BikeList bikes={bikes} setBikes={setBikes}/>:
            "" }
        </div>
        </div>
        </>
    )
}