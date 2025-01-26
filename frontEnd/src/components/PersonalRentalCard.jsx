import { returnBike } from "../Controllers/bikeControllers"

export default function PersonalRentalCard(props) {

    const { rental, setMyRentals, myRentals } = props
    const { bike_id, type, image, name, size, date } = rental

    return(
        <div className="card m-3" style={{ width: 18 + "rem" }}>
        <img src={image} className="card-img-top" alt={name + bike_id}/>
        <div className="card-body">
            <h5 className="card-title">{type}</h5>
            <p className="card-text">model: {name}</p>
            <p className="card-text">size: {size}</p>
            <p className="card-text">rented on: {date}</p>
            <button className="btn btn-primary" onClick={async () => {
                await returnBike(bike_id)
                setMyRentals(myRentals.filter(rental => rental.bike_id != bike_id))
                }}>Return</button>
        </div>
        </div>
    )
}