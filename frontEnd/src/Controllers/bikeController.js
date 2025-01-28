const API_URL = import.meta.env.VITE_API_URL

export const getAvailableBikes = async () => {
    const res = await fetch(`${API_URL}/bikes/allAvailableBikes`)
    const data = await res.json()
    return data.bikes
}

export const getAllBikes = async () => {
    const res = await fetch(`${API_URL}/bikes/allBikes`)
    const data = await res.json()
    return data.bikes
}


