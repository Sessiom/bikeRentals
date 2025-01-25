const API_URL = import.meta.env.VITE_API_URL

export const addBike = async (type, image, name, size) => {
    const result = await fetch(`${API_URL}/bikes/addBike`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, image, name, size })
    })
    data = await response.json()
    console.log(data)
}

export const getBikes = async () => {
    const response = await fetch(`${API_URL}/bikes/allBikes`)
    const data = await response.json()
    return data.bikes
}
