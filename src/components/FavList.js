import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import ListCard from './ListCard'
import CardDeck from 'react-bootstrap/CardDeck'

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
    
  
    let trails = trailList.map((obj) => ({trail: obj.trail, trail_list: obj.id}))
  
    let myTrails = trails.map((trailObj) => 
        <ListCard key={trailObj.trail.id} trailObj={trailObj} onTrailDelete={handleTrailDelete}/>
    )

    function handleTrailDelete(passedId){
        fetch(`http://localhost:3000/trail_lists/${passedId}`, {
            method: "DELETE"
        })
        .then(r => r.json())
        .then(deletedTrail => {
            let updatedTrailList = trailList.filter((trailList) => trailList.id !== passedId)
            setTrailList(updatedTrailList)
        })
    }

    
    return(
        <div>
            <h2>{list.title}</h2>
            <div className="favCards">
                <div className="favList">
                    <CardDeck style={{width: '18rem'}}>
                        {myTrails}
                    </CardDeck>
                </div>
            </div>
        </div>
    )
}

export default FavList;