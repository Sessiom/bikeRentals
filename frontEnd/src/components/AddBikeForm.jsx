import { useState} from 'react'
import { addBike } from '../Controllers/bikeControllers'

export default function AddBikeForm() {

    const [type, setType] = useState("Cross Country")
    const [size, setSize] = useState("XS")
    const [image, setImage] = useState("")
    const [name, setName] = useState("")
    const [formHelp, setFormHelp] = useState("")
    
    return(
        <form>
        <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Type</label>
            <select className="form-control" id="exampleFormControlSelect1" onChange={(e) => setType(e.target.value)}>
            <option>Cross Country</option>
            <option>Enduro</option>
            <option>Downhill</option>
            <option>Road</option>
            <option>Gravel</option>
            <option>BMX</option>
            </select>
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Size</label>
            <select className="form-control" id="exampleFormControlSelect1" onChange={(e) => setSize(e.target.value)}>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
            </select>
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Image URL</label>
            <input className="form-control" id="exampleFormControlInput1" placeholder="bikes.com/image" onChange={(e) =>setImage(e.target.value)}/>
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Name</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) =>setName(e.target.value)}></textarea>
        </div>
        <p className={formHelp == "Please fill out all fields" ? "text-danger" : "text-success"}>{formHelp != "" ? formHelp : ""}</p>
        <button className="btn btn-primary" onClick={async (e) => {
            //prevent form submission from refreshing page
            e.preventDefault()
            //Make sure no input is empty
            if(!type || !size || !image || !name) { 
                setFormHelp("Please fill out all fields")
                return 
            }
            //Add post bike data to api
            const response = await addBike(type, size, image, name)
            console.log(response)
            //Display response
            setFormHelp(response.message)
        }}>Add new bike</button>
        </form>
    )
}