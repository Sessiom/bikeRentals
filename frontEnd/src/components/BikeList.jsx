import { deleteBike } from "../Controllers/adminController"

export default function BikeList(props) {

    const { bikes, setBikes } = props
    return(
        <table className="table table-hover">
            <thead>
                <tr>
                <th scope="col">ID#</th>
                <th scope="col">Type</th>
                <th scope="col">Size</th>
                <th scope="col">Name</th>
                <th scope="col">Manage</th>
                </tr>
            </thead>
            <tbody>
                {
                    bikes.map((bike) => {

                        return(
                            <tr key={bike.bike_id}>
                            <th scope="row">{bike.bike_id}</th>
                            <td>{bike.type}</td>
                            <td>{bike.size}</td>
                            <td>{bike.name}</td>
                            <td><button className="btn btn-danger" onClick={async() => {
                                await deleteBike(bike.bike_id)
                                setBikes(bikes.filter((newBike) => newBike.bike_id != bike.bike_id))                      
                            }}>Delete</button></td>
                            </tr>
                        )

                    })
                }
            </tbody>
        </table>
    )
}