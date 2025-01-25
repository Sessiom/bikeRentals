import { returnBike } from "../Controllers/bikeControllers"
import { rentBike } from "../Controllers/bikeControllers"
import { getMyRentals } from "../Controllers/bikeControllers"
import { getBikes } from "../Controllers/bikeControllers"

export default function RentalCard(props) {

    const { bike, rental, setMyRentals, setBikes, bikes, myRentals } = props
    const { bike_id, type, image, name, size, available} = bike || rental

    return(
        <div className="card m-3" style={{ width: 18 + "rem" }}>
        <img src={image} className="card-img-top" alt={name + bike_id}/>
        <div className="card-body">
            <h5 className="card-title">{type}</h5>
            <p className="card-text">model: {name}</p>
            <p className="card-text">size: {size}</p>
            {available ? 
            <button className="btn btn-primary" onClick={async () => {
                await rentBike(bike_id)
                setBikes(bikes.filter(bike => bike.bike_id != bike_id))
                
            }}>Rent</button> :
            <button className="btn btn-primary" onClick={async () => {
                await returnBike(bike_id)
                setMyRentals(myRentals.filter(rental => rental.bike_id != bike_id))
               
                }}>Return</button>}
        </div>
        </div>
    )
}