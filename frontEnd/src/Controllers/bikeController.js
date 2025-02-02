
export const getAvailableBikes = async () => {
    const res = await fetch(`/api/bikes/allAvailableBikes`)
    const data = await res.json()
    return data.bikes
}

export const getAllBikes = async () => {
    const res = await fetch(`/api/bikes/allBikes`)
    const data = await res.json()
    return data.bikes
}


