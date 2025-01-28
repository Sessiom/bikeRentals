const API_URL = import.meta.env.VITE_API_URL

export const getMyRentals = async () => {
    const token = localStorage.getItem('token')
    try{
        const res = await fetch(`${API_URL}/customer/myRentals`, {
            headers: {
                'Authorization': token
            }
        })
        const data = await res.json()
        return data.rentalInfo
    } catch(err){
        console.log(err)
    }
}

export const rentBike = async(bike_id) => {
    const token = localStorage.getItem('token')
    const res = await fetch(`${API_URL}/customer/rent/${bike_id}`, {
        method: 'PUT',
        headers: {
            'Authorization': token
        }
    })
    const data = await res.json()
    console.log(data)
}

export const returnBike = async(bike_id) => {
    const token = localStorage.getItem('token')
    const res = await fetch(`${API_URL}/customer/return/${bike_id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': token
        }
    })
    const data = await res.json()
    console.log(data)
}