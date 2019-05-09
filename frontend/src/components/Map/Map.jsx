import React from "react";
import { compose, withProps, mapProps} from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer,
    Marker
} from "react-google-maps";

const enhance = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAXRoo8kh7I1XuGA_OjinkIoZ4mEJ0w4j4&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    mapProps(({ waypoints, ...rest }) => {
        return (
            {
                markers: (waypoints || []).map((point, index) => {
                    return (<Marker position={point.location} key={index} />);
                }),
                ...rest
            }
        )
    }),
    withScriptjs,
    withGoogleMap
);

const Map = enhance(({ onClick, onRightClick, markers, directions }) => (
    <GoogleMap
        defaultZoom={ 14 }
        defaultCenter={ new window.google.maps.LatLng(-19.932654, -43.936020)}
        onClick={ onClick }
        onRightClick={ onRightClick } >
        { markers }
        { directions && <DirectionsRenderer directions={ directions } /> }
    </GoogleMap>)
);

export default Map;