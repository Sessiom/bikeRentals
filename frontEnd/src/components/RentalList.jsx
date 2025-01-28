import RentalCard from "./RentalCard"

export default function RentalList(props) {

    const { loading, bikes, setBikes, setMyRentals, setSelectedTab, isLoggedIn } = props

    if (loading){
        return <p>Loading</p>
    }

    return(
        <div className="container mt-3">
            <div className="row justify-content-center"> 
                {!isLoggedIn ? <span className="border border-3 border-primary rounded-5 bg-body-secondary"><h1 className="text-center">Welcome to Rex's Rentals</h1></span> : ""}
                    {   bikes.length > 0 ? bikes.map((bike) => {
                        return <RentalCard key={bike.bike_id} setSelectedTab={setSelectedTab} bike={bike} bikes={bikes} setBikes={setBikes} setMyRentals={setMyRentals}/>
                    }) : "No bikes available"}
            </div>
        </div>
    )
}