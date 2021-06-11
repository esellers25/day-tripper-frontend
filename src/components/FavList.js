import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'

function FavList(){

    const {id} = useParams()
    const [lists, setLists] = useState([])
    const [pageLoaded, setPageLoaded] = useState(false)
    
    useEffect(() => {
        fetch(`http://localhost:3000/lists/${id}`)
        .then(r => r.json())
        .then(lists => {
            setLists(lists)
            console.log(lists)
            setPageLoaded(true)
        })
    }, [id])
    
    if(!pageLoaded){
        return(
            <p>Loading</p>
        )
    }
    
    // const allTrails = lists.trail_lists.map((trail_list) => {
    //     <p>{trail_list.id}</p>
    // })
    let allTrails = lists.trail_lists 
    console.log(allTrails)
    
    return(
        <div>
            <h1>My Lists</h1>
            {lists.title}
        </div>
    )
}

export default FavList;