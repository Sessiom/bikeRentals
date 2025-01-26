export default function CustomerList(props) {

    const { customers } = props

    return(
        <table className="table table-hover">
            <thead>
                <tr>
                <th scope="col">ID#</th>
                <th scope="col">Email</th>
                <th scope="col">Bikes Currently Rented</th>
                <th scope="col">Manage</th>
                </tr>
            </thead>
            <tbody>
                {
                    customers.map((customer) => {
                        return (
                            <tr key={customer.customer_id}>
                            <th scope="row">{customer.customer_id}</th>
                            <td>{customer.email}</td>
                            <td><button className="btn btn-primary">Bike count: {customer.rental_count}</button></td>
                            <td><button className="btn btn-primary">Edit</button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}