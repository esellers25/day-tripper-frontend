import CardDeck from 'react-bootstrap/CardDeck'
import TrailCard from "./TrailCard";

function TrailList({trails}){
    return(
        <div>
            <CardDeck>
            {trails.map((trail) => <TrailCard key={trail.name} trail={trail}/>)}
            </CardDeck>
        </div>
    )
}

export default TrailList; 