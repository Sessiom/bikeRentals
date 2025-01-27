import { rentBike } from "../Controllers/bikeControllers"

export default function RentalCard(props) {

    const { bike, setBikes, bikes, setSelectedTab} = props
    const { bike_id, type, image, name, size, available} = bike

    return(
        <div className="card m-3" style={{ width: 18 + "rem" }}>
        <img src={image} className="card-img-top" alt={name + bike_id}/>
        <div className="card-body">
            <h5 className="card-title">{type}</h5>
            <p className="card-text">model: {name}</p>
            <p className="card-text">size: {size}</p>
            <button className={available ? "btn btn-primary" : "btn btn-primary disabled"} onClick={async () => {
                const token = localStorage.getItem('token')
                if(!token) { 
                    setSelectedTab('sign-in')
                    alert("You must sign in to rent a bike")
                    return
                }
                await rentBike(bike_id)
                setBikes(bikes.filter(bike => bike.bike_id != bike_id))
            }}>Rent</button>

        </div>
        </div>
    )
}