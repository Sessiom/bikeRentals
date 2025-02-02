
export const getAllCustomers = async() => {
    const token = localStorage.getItem('token')
    const res = await fetch(`/api/admin/allCustomers`,{
        headers: {
            'authorization': token
        }
    })
    const data = await res.json()
    return data
}

export const addBike = async (type, size, image, name) => {
    const token = localStorage.getItem('token')
    const res = await fetch(`/api/admin/addBike`, {
        method: 'POST',
        headers: { 
            'authorization': token,
            'Content-Type': 'application/json' },
        body: JSON.stringify({ type, image, name, size })
    })
    const data = await res.json()
    return data
}

export const deleteCustomer = async(customer_id) => {
    const token = localStorage.getItem('token')
    const res = await fetch(`/api/admin/deleteCustomer/${customer_id}`,{
        method: 'DELETE',
        headers: {
            'authorization': token
        }
    })
    const data = await res.json()
    return data.message
}

export const deleteBike = async(bike_id) => {
    const token = localStorage.getItem('token')
    const res = await fetch(`/api/admin/deleteBike/${bike_id}`,{
        method: 'DELETE',
        headers: {
            'authorization': token
        }
    })
    const data = await res.json()
    return data
}

export const getCustomerRentalsById = async(customer_id) => {
    const token = localStorage.getItem('token')
    const res = await fetch(`/api/admin/customerRentals/${customer_id}`,{
        headers: {
            'authorization': token
        }
    })
    const data = await res.json()
    return data
} 

export const validate = async() => {
    const token = localStorage.getItem('token')
    const res = await fetch(`/api/admin/`,{
        headers: {
            'authorization': token
        }
    })
    const data = await res.json()
    return data
}
