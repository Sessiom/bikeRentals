

export const register = async(email, password) => {
    try {
        const result = await fetch(`/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
        const data = await result.json()

        if (data.token) {
            localStorage.setItem('token', data.token)
            return data
        } else {
            throw Error('Failed to authenticate...')
        }

    } catch (err) {
        console.log(err)
        return false;
    }

}

export const login = async(email, password) => {

    const result = await fetch(`/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })
    const data = await result.json()

    if (data.token) {
        localStorage.setItem('token', data.token)
    } 
    return data
}