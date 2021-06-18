import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import {useRef, useCallback, useState} from 'react';

function MapView({trails}){

    const [selectedTrail, setSelectedTrail] = useState(null)

    const containerStyle = {
        width: '100%',
        height: '550px'
      };

    const center = {
        lat: 43.48920383807758,
        lng: -71.02158148267549
    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
    })


    const options = {
            disableDefaultUI: true,
            zoomControl: true
        }
    
    const mapRef = useRef()
    const onMapLoad = useCallback((map) => {
        mapRef.current = map
    }, [])

    const markers = trails.map((trail) => <Marker key={trail.id} onClick={() => setSelectedTrail(trail)} position={{lat: trail.latitude, lng: trail.longitude}}/>)
      
    return (
        <div className="map">
            <div className="google-map-main">
                {isLoaded ? 
                <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={7}
                options={options}
                onLoad={onMapLoad}
                >
                    {trails.map((trail) => <Marker key={trail.id} onClick={() => setSelectedTrail(trail)} position={{lat: trail.latitude, lng: trail.longitude}}/>)}
                    {selectedTrail && 
                    (<InfoWindow position={{lat: selectedTrail.latitude, lng: selectedTrail.longitude}} 
                    onCloseClick={() => {setSelectedTrail(null)}}>
                        <div>
                            <h5>{selectedTrail.name}</h5>
                            <p>{selectedTrail.location}</p>
                        </div>
                    </InfoWindow>)}
                </GoogleMap>
                : null}
            </div>
        </div>
    )
}
export default MapView;