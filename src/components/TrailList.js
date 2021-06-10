import TrailCard from "./TrailCard";

function TrailList({trails}){
    return(
        <div>
            {trails.map((trail) => <TrailCard key={trail.name} trail={trail}/>)}
        </div>
    )
}

export default TrailList; 