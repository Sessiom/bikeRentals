import { login, register } from '../Controllers/authController'
import { useState } from 'react'
import { useNavigate } from 'react-router'

export default function Login(props) {
    const { setIsLoggedIn, setUserData, setIsAdmin } = props
    const [ email, setEmail] = useState("")
    const [ password, setPassword] = useState("")
    const [ warning, setWarning] = useState("")
    const [ success, setSuccess] = useState("")
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email); // Basic email regex check
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setWarning("Please fill out both fields");
            return
        } 
        const data = await login(email, password);
        setWarning(data.message)

        // If the user is logged in
        if (data.email) {
            setSuccess("Log in successful")
            setIsLoggedIn(true)
            setIsAdmin(data.is_admin)
            setUserData(data)
            setEmail("")
            setPassword("")
            navigate("/")
        };
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setWarning("Please fill out both fields");
            return
        } 
        if (!validateEmail(email)) {
            setWarning("Invalid email format");
            return;
        }
        const data = await register(email, password); 
        setWarning(data.message)

        // If the user is created
        if (data.email) {
            setSuccess("Registration successful")
            setIsLoggedIn(true)
            setIsAdmin(data.is_admin)
            setUserData(data)
            setEmail("")
            setPassword("")
            navigate("/")
        }; 
    }

    return(
        <div className="container mt-5 max">
            <form>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <p className="text-danger">{warning}</p>
            <p className="text-success">{success}</p>
            <button onClick ={
                handleLogin
            } className="btn btn-primary">Login</button>
            <button onClick = {
                handleRegister
            } className="btn btn-primary m-1" >Register</button>
            </form>
        </div>
    )
}