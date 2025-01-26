import PersonalRentalCard from "./PersonalRentalCard"

export default function MyRentals(props) {

    const { myRentals, setMyRentals} = props
    return(
        <div className="container mt-3">
            <div className="row justify-content-center">  
                    {myRentals.length > 0 ? myRentals.map((rental) => {
                        return <PersonalRentalCard key={rental.bike_id} rental={rental} myRentals={myRentals} setMyRentals={setMyRentals} />
                    }) : "You have no rentals"}
            </div>
        </div>
    )
}