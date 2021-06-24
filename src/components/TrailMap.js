import {useRef, useCallback} from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

function TrailMap({coordinates}){
   
    const containerStyle = {
        width: '100%',
        height: '400px'
    };
    
    const center = {
        lat: coordinates.latitude,
        lng: coordinates.longitude
    }

    const mapRef = useRef()
    const onMapLoad = useCallback((map) => {
        mapRef.current = map
    }, [])
    
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
    })

    const options = {
            disableDefaultUI: true,
            zoomControl: true
    }
        
        return(
            <div className="map">
            <div className="google-map">
                {isLoaded ? 
                <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={11}
                options={options}
                onLoad={onMapLoad}
                >
                    <Marker 
                    icon={{
                        url: "https://img.icons8.com/emoji/452/hiking-boot.png",
                        scaledSize: new window.google.maps.Size(50,50),
                        anchor: new window.google.maps.Point(5,5)
                    }}
                    position={{lat: coordinates.latitude,
                        lng: coordinates.longitude}}/>
                </GoogleMap>
                : null}
            </div>
        </div>
    )
}

export default TrailMap; 