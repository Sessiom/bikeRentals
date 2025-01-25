export default function RentalCard(props) {

    const { bike, rental } = props
    console.log(rental)
    const { bike_id, type, image, name, size, available} = bike || rental

    return(
        <div className="card m-3" style={{ width: 18 + "rem" }}>
        <img src={image} className="card-img-top" alt={name + bike_id}/>
        <div className="card-body">
            <h5 className="card-title">{type}</h5>
            <p className="card-text">{name}</p>
            <p className="card-text">{size}</p>
            <button className={`btn btn-primary ${!available ? 'disabled' : ''}`}>Rent</button>
        </div>
        </div>
    )
}