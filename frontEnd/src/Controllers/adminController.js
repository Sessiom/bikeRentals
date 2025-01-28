const API_URL = import.meta.env.VITE_API_URL

export const getAllCustomers = async() => {
    const token = localStorage.getItem('token')
    const res = await fetch(`${API_URL}/admin/allCustomers`,{
        headers: {
            'authorization': token
        }
    })
    const data = await res.json()
    return data
}

export const addBike = async (type, size, image, name) => {
    const token = localStorage.getItem('token')
    const res = await fetch(`${API_URL}/admin/addBike`, {
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
    const res = await fetch(`${API_URL}/admin/deleteCustomer/${customer_id}`,{
        method: 'DELETE',
        headers: {
            'authorization': token
        }
    })
    const data = await res.json()
    return data
}

export const deleteBike = async(bike_id) => {
    const token = localStorage.getItem('token')
    const res = await fetch(`${API_URL}/admin/deleteBike/${bike_id}`,{
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
    const res = await fetch(`${API_URL}/admin/customerRentals/${customer_id}`,{
        headers: {
            'authorization': token
        }
    })
    const data = await res.json()
    return data
} 

export const validate = async() => {
    const token = localStorage.getItem('token')
    const res = await fetch(`${API_URL}/admin/`,{
        headers: {
            'authorization': token
        }
    })
    const data = await res.json()
    return data
}
