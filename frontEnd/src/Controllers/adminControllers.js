const API_URL = import.meta.env.VITE_API_URL
const token = localStorage.getItem('token')

export const getAllCustomers = async() => {
    const res = await fetch(`${API_URL}/admin/allCustomers`,{
        headers: {
            'authorization': token
        }
    })
    const data = res.json()
    return data
}
