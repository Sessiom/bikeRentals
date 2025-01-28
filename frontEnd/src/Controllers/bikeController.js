
export const getAvailableBikes = async () => {
    const res = await fetch(`/bikes/allAvailableBikes`)
    const data = await res.json()
    console.log(data)
    return data.bikes
}

export const getAllBikes = async () => {
    const res = await fetch(`/bikes/allBikes`)
    const data = await res.json()
    return data.bikes
}


