import RentalCard from "./RentalCard"

export default function MyRentals(props) {

    const { myRentals, setMyRentals, setBikes } = props
    return(
        <div className="container mt-3">
            <div className="row justify-content-center">  
                    {myRentals.length > 0 ? myRentals.map((rental) => {
                        return <RentalCard key={rental.bike_id} rental={rental} myRentals={myRentals} setMyRentals={setMyRentals} setBikes={setBikes}/>
                    }) : "You have no rentals"}
            </div>
        </div>
    )
}