import { useEffect } from "react"
import { getMyRentals } from "../Controllers/customerController"
import PersonalRentalCard from "./PersonalRentalCard"

export default function MyRentals(props) {

    const { myRentals, setMyRentals} = props

    useEffect(() => {   

        const fetchRentals = async () => {
            const data = await getMyRentals()
            setMyRentals(data)
        }
        fetchRentals()
    }, [])

    return(
        <div className="container mt-3">
            <h1 className="text-center text-primary">My Rentals</h1>
            <div className="row justify-content-center">  
                    {myRentals.length > 0 ? myRentals.map((rental) => {
                        return <PersonalRentalCard key={rental.confirmation_id} rental={rental} myRentals={myRentals} setMyRentals={setMyRentals} />
                    }) : "You have no rentals"}
            </div>
        </div>
    )
}