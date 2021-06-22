import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import ListCard from './ListCard'
import CardDeck from 'react-bootstrap/CardDeck'
import { Button } from './style'
import {useSelector} from 'react-redux';

function FavList(){

    const {id} = useParams()
    const [list, setList] = useState({})
    const [trailList, setTrailList] = useState([])
    const [pageLoaded, setPageLoaded] = useState(false)
    const [isPublic, setIsPublic] = useState(true)
    const currentUserId = useSelector((state) => state.userReducer.id)
    
    useEffect(() => {
        fetch(`http://localhost:3000/lists/${id}`)
        .then(r => r.json())
        .then(resp => {
            setList(resp)
            setTrailList(resp.trail_lists)
            setPageLoaded(true)
            setIsPublic(resp.public)
        })
    }, [id])
    
    
    if(!pageLoaded){
        return(
            <p>Loading</p>
        )
    }
  
    let trails = trailList.map((obj) => ({trail: obj.trail, trail_list: obj.id}))
  
    let myTrails = trails.map((trailObj) => 
        <ListCard key={trailObj.trail.id} trailObj={trailObj} photos={trailObj.trail.photos} onTrailDelete={handleTrailDelete} pageLoaded={pageLoaded}/>
    )

    function handleTrailDelete(passedId){
        fetch(`http://localhost:3000/trail_lists/${passedId}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.token
            }
        })
        .then(r => r.json())
        .then(deletedTrail => {
            let updatedTrailList = trailList.filter((trailList) => trailList.id !== passedId)
            setTrailList(updatedTrailList)
        })
    }

    function handleListPublic(id){
        fetch(`http://localhost:3000/lists/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type" : "application/json",
                "Authorization": localStorage.token
            },
            body: JSON.stringify({
                public: (!isPublic)
            })
        })
        .then(r => r.json())
        .then(resp => setIsPublic(resp.public))
    }
    
    if(isPublic || currentUserId === parseInt(id)) {
        return(
            <div className="favoritesPage">
                <h2>{list.title}</h2>
                {currentUserId === parseInt(id) ? <Button onClick={() => handleListPublic(list.id)}>Make List {isPublic ? "Private": "Public"}</Button> : null}
                <div className="favCards">
                    <CardDeck>
                        {myTrails}
                    </CardDeck>
                </div>
            </div>
        )
    }
    else {
        return (
            <h2 style={{textAlign: "center"}}>No public lists</h2>
        )
    }
}

export default FavList;