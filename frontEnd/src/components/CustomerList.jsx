import { deleteCustomer } from "../Controllers/adminController"
import { getCustomerRentalsById } from "../Controllers/adminController"

export default function CustomerList(props) {

    const { customers, setCustomers, userData, setSelectedTab, setRentalData } = props
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
                            <td><button className={ customer.rental_count == 0 ? "btn btn-primary disabled": "btn btn-primary" } onClick={ async () =>{
                                setRentalData( await getCustomerRentalsById(customer.customer_id))
                                setSelectedTab('rental-manager')
                            }}>See {customer.rental_count} {customer.rental_count == 1 ? "Bike": "Bikes"}</button></td>
                            <td><button className={ userData.customer_id == customer.customer_id ? "btn btn-danger disabled": "btn btn-danger" } onClick={async() => {
                                await deleteCustomer(customer.customer_id)
                                setCustomers(customers.filter((newCustomer) => newCustomer.customer_id != customer.customer_id))
                            }}>Delete</button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}