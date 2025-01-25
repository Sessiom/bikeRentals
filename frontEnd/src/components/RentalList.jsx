import RentalCard from "./RentalCard"

export default function RentalList(props) {

    const { loading, bikes } = props

    if (loading){
        return <p>Loading</p>
    }

    return(
        <div className="container mt-3">
            <div className="row justify-content-center">  
                    {bikes.length > 1 ? bikes.map((bike) => {
                        return <RentalCard key={bike.bike_id} bike={bike}/>
                    }) : "No bikes available"}
            </div>
        </div>
    )
}