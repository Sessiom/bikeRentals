import { returnBike } from "../Controllers/customerController"

export default function PersonalRentalCard(props) {

    const { rental, rentalData, setRentalData } = props
    const { type, name, date, size, image, bike_id} = rental
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
                setRentalData(rentalData.filter(rental => rental.bike_id != bike_id))
                }}>Return</button>
        </div>
        </div>
    )
}