import {useState} from 'react'
import {useSelector} from 'react-redux'

function AddTrailForm(){

    return(
        <div>
            <h2>Add a Trail</h2>
            <form>
                <label htmlFor="name">Summit/Trail Name</label>
                <input name="name" type="text"></input>
                <label htmlFor="location">Location</label>
                <input name="location" type="text"></input>
                <label htmlFor="state">State</label>
                <input name="state" type="text"></input>
                <label htmlFor="length">Length in miles</label>
                <input name="length" type="number"></input>
                <label htmlFor="difficulty">Difficulty</label>
                <select name="difficulty">
                    <option>Hard</option>
                    <option>Moderate</option>
                    <option>Easy</option>
                </select>
                <label htmlFor="elevation">Elevation Gain in feet</label>
                <input name="elevation" type="text"></input>
                <label htmlFor="route">Route Type</label>
                <select name="route">
                    <option>Loop</option>
                    <option>Out and Back</option>
                </select>
                <label htmlFor="latitude">Trailhead Latitude</label>
                <input name="latitude"></input>
                <label htmlFor="longitude">Trailhead Longitude</label>
                <input name="longitude"></input>
                <button type="submit">Add Trail</button>
            </form>
        </div>
    )
}

export default AddTrailForm; 