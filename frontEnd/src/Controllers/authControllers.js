const API_URL = import.meta.env.VITE_API_URL

export const register = async(email, password) => {
    try {
        const result = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
        const data = await result.json()

        if (data.token) {
            localStorage.setItem('token', data.token)
            return true
        } else {
            throw Error('Failed to authenticate...')
        }

    } catch (err) {
        console.log(err)
        return false;
    }

}

export const login = async(email, password) => {
    try {
        const result = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
        const data = await result.json()

        if (data.token) {
            localStorage.setItem('token', data.token)
            return true
        } else {
            throw Error('Failed to authenticate...')
        }

    } catch (err) {
        console.log(err)
        return false;
    }

}