import RentalCard from "./RentalCard"
import { useState, useEffect } from "react"
import { getAllBikes, getAvailableBikes } from "../Controllers/bikeController"

export default function RentalList(props) {

    const { bikes, setBikes, setMyRentals, setSelectedTab, isLoggedIn } = props

    const [ filter, setFilter] = useState("All available bikes")


    useEffect(() => {
        const fetchBikes = async () => {
            if (filter === "All available bikes") {
                const availableBikes = await getAvailableBikes()
                setBikes(availableBikes)
            } else if (filter === "All bikes") {
                const allBikes = await getAllBikes()
                setBikes(allBikes)
            }
        }
        
        fetchBikes()
    }, [filter, setBikes])

    return(
        <div className="container mt-3">
            <div className="row justify-content-center"> 
                {!isLoggedIn ? <span className="border border-3 border-primary rounded-5 bg-body-secondary"><h1 className="text-center">Welcome to Rex's Rentals</h1></span> : ""}
                <select className="form-select mt-3" aria-label="bike-filter" onChange={(e) => setFilter(e.target.value)}>
                    <option defaultValue>All available bikes</option>
                    <option >All bikes</option>
                </select>
                    {   bikes.length > 0 ? bikes.map((bike) => {
                        return <RentalCard key={bike.bike_id} setSelectedTab={setSelectedTab} bike={bike} bikes={bikes} setBikes={setBikes} setMyRentals={setMyRentals}/>
                    }) : "No bikes available"}
            </div>
        </div>
    )
}