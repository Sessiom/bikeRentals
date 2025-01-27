import {getAllCustomers}from "../Controllers/adminControllers"
import { useState, useEffect } from 'react'
import CustomerList from "./CustomerList"
import AddBikeForm from "./AddBikeForm"

export default function Admin(props) {
    const { userData } = props
    const [ customers, setCustomers] = useState([])
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
            <a className="nav-link" style={{ cursor: 'pointer' }} onClick={ () => setSelectedTab("add-new-bike")}>Add new bike</a>
        </li>
        </ul>

        <div className="container mt-3">
        <div className="row justify-content-center"> 
            {selectedTab == "customer-list" ? <CustomerList userData={userData} customers={customers} setCustomers={setCustomers}/> : 
            selectedTab == "add-new-bike" ? <AddBikeForm /> : "" }
        </div>
        </div>
        </>
    )
}