import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import ListCard from './ListCard'

function FavList(){

    const {id} = useParams()
    const [list, setList] = useState({})
    const [trailList, setTrailList] = useState([])
    const [pageLoaded, setPageLoaded] = useState(false)
    
    useEffect(() => {
        fetch(`http://localhost:3000/lists/${id}`)
        .then(r => r.json())
        .then(resp => {
            setList(resp)
            setTrailList(resp.trail_lists)
            setPageLoaded(true)
        })
    }, [id])
    
    if(!pageLoaded){
        return(
            <p>Loading</p>
        )
    }
    
  
    let trails = trailList.map((obj) => obj.trail)
    let myTrails = trails.map((trail) => 
        <ListCard key={trail.id} trail={trail}/>
    )

    
    return(
        <div>
            <h1>My Lists</h1>
            {myTrails}
        </div>
    )
}

export default FavList;