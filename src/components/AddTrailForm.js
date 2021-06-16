import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Button, TrailForm} from './style'

function AddTrailForm(){

    const history = useHistory()
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        state: "",
        length: null,
        elevation_gain: null,
        difficulty: "",
        route_type: "",
        latitude: null,
        longitude: null,
    })

    function handleChange(e){
        const key = e.target.name 
        const value = e.target.value 

        setFormData({
            ...formData, 
            [key]: value
        })
    }

    function addNewTrail(e){
        e.preventDefault()
        fetch("http://localhost:3000/trails", {
            method: "POST", 
            headers: {
                "Content-type" : "application/json"
            }, 
            body: JSON.stringify(formData)
        })
        .then(r => r.json())
        .then(resp => history.push("/home"))
    }
    

    return(
        <div>
            <h2 className="addTrail">Add a Trail</h2>
            <TrailForm onSubmit={addNewTrail} className="editform">
                <label htmlFor="name">Summit/Trail Name</label>
                <input name="name" type="text" value={formData.name} onChange={handleChange}></input>
                <label htmlFor="location">Location</label>
                <input name="location" type="text" value={formData.location} onChange={handleChange}></input>
                <label htmlFor="state">State</label>
                <input name="state" type="text" value={formData.state} onChange={handleChange}></input>
                <label htmlFor="length">Length in miles</label>
                <input name="length" type="number" step="0.1" value={formData.length} onChange={handleChange}></input>
                <label htmlFor="difficulty">Difficulty</label>
                <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
                    <option value="hard">Hard</option>
                    <option value="moderate">Moderate</option>
                    <option value="easy">Easy</option>
                </select>
                <label htmlFor="elevation">Elevation Gain in feet</label>
                <input name="elevation" type="number" value={formData.elevation_gain} onChange={handleChange}></input>
                <label htmlFor="route">Route Type</label>
                <select name="route" value={formData.route_type} onChange={handleChange}>
                    <option value="Loop">Loop</option>
                    <option value="Out and Back">Out and Back</option>
                    <option value="Point to Point">Point to Point</option>
                </select>
                <label htmlFor="latitude">Trailhead Latitude</label>
                <input name="latitude" type="number" step="any" value={formData.latitude} onChange={handleChange}></input>
                <label htmlFor="longitude">Trailhead Longitude</label>
                <input name="longitude"  type="number" step="any" value={formData.longitude} onChange={handleChange}></input>
                <Button type="submit">Add Trail</Button>
            </TrailForm>
        </div>
    )
}

export default AddTrailForm; 