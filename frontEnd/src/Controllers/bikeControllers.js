const API_URL = import.meta.env.VITE_API_URL
const token = localStorage.getItem('token')

export const addBike = async (type, image, name, size) => {
    const res = await fetch(`${API_URL}/bikes/addBike`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, image, name, size })
    })
    data = await res.json()
    console.log(data)
}

export const getBikes = async () => {
    const res = await fetch(`${API_URL}/bikes/allBikes`)
    const data = await res.json()
    return data.bikes
}

export const getMyRentals = async () => {
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
    const res = await fetch(`${API_URL}/customer/return/${bike_id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': token
        }
    })
    const data = await res.json()
    console.log(data)
}
