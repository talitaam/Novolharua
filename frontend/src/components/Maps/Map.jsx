import React from 'react';
const { compose } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  GroundOverlay,
} = require("react-google-maps");

const google = window.google;

const MapWithGroundOverlay = withScriptjs(
    withGoogleMap(props =>
        <GoogleMap
            defaultZoom={props.defaultZoom}
            defaultCenter={props.defaultCenter}
        >
            <GroundOverlay
                defaultUrl={props.defaultUrl}
                defaultBounds={
                    props.defaultBounds
                    // new google.maps.LatLngBounds(
                    //     new google.maps.LatLng(40.712216, -74.22655),
                    //     new google.maps.LatLng(40.773941, -74.12544)
                    // )
                }

            defaultOpacity={.5}
            />
        </GoogleMap>
    )
);

export default (props) => (
    <MapWithGroundOverlay
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAXRoo8kh7I1XuGA_OjinkIoZ4mEJ0w4j4&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `700px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        defaultBounds={props.defaultBounds}
        defaultUrl={props.defaultUrl}
        defaultZoom={props.defaultZoom}
        defaultCenter={props.defaultCenter}
    />
);