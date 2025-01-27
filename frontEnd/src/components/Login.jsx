import { login, register } from '../Controllers/authControllers'
import { useState } from 'react'

export default function Login(props) {
    const { setSelectedTab, setIsLoggedIn, setUserData } = props
    const [ email, setEmail] = useState("")
    const [ password, setPassword] = useState("")
    const [ message, setMessage] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) return; 
        const data = await login(email, password);
        setMessage(data.message)

        // If the user is created
        if (data.email) {
            setSelectedTab('available-rentals')
            setIsLoggedIn(true)
            setUserData(data)
        };
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!email || !password) return;
        const data = await register(email, password); 
        setMessage(data.message)

        // If the user is created
        if (data.email) {
            setSelectedTab('available-rentals')
            setIsLoggedIn(true)
            setUserData(data)
        }; 
    }

    return(
        <div className="container mt-5 max">
            <form>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
                onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="password"
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <p className="text-danger">{message}</p>
            <button onClick ={
                handleLogin
            }type="submit" className="btn btn-primary">Login</button>
            <button onClick = {
                handleRegister
            }type="submit" className="btn btn-primary m-1" >Register</button>
            </form>
        </div>
    )
}