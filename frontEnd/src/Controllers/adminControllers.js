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
