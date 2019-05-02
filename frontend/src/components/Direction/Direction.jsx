import React from "react";
import { compose, withProps, withState, withHandlers, mapProps, lifecycle } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer,
    Marker
} from "react-google-maps";

const MAX_ROUTE_POINTS = 10;

const enhance = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAXRoo8kh7I1XuGA_OjinkIoZ4mEJ0w4j4&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withState('waypoints', 'setWaypoints', []),
    withState('directions', 'setDirection', []),
    withHandlers({
        clickHandler: props => event => {
            const { waypoints, setWaypoints } = props;
            if (waypoints.length > MAX_ROUTE_POINTS) {
                alert('Limite de pontos máximo atigido\n Não é possível adicionar mais do que 10 pontos');
            } else {
                window.canUpdate = true;
                waypoints.push({
                    location: event.latLng,
                    stopover: true
                });
                window.waypoints = waypoints;
                setWaypoints(() => waypoints);
            }
        },
        rightClickHandler: props => () => {
            const { google } = window;
            const { waypoints, setDirection, setWaypoints, travelMode } = props;

            if (!waypoints.length || waypoints.length < 2) {
                alert('Pontos insuficientes para calcular uma rota \n É necessário no mínimo 2');
            } else {
                window.waypoints = waypoints;
                const waypointsAux = waypoints.slice(0);
                const origin = waypointsAux.shift().location;
                const destination = waypointsAux.pop().location;

                const DirectionsService = new google.maps.DirectionsService();

                DirectionsService.route({
                    origin: origin,
                    destination: destination,
                    waypoints: waypointsAux,
                    travelMode: google.maps.TravelMode['WALKING'],
                }, (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        console.log(result);
                        window.mapsRoute = result.routes[0].overview_path.map( point => {return ({ lat: point.lat(), lng: point.lng()});});
                        setDirection(() => result);
                        setWaypoints(() => []);
                    } else {
                        console.error(`Erro ao buscar rota : ${result}`);
                    }
                });
            }
        }
    }),
    lifecycle({
        shouldComponentUpdate(nextProps, nextState) {
            if (window.waypoints.length !== nextProps.waypoints.length || window.canUpdate) {
                nextProps.setWaypoints(() => window.waypoints);
                window.canUpdate = false;
                return true;
            } else {
                return false;
            }
        }
    }),
    mapProps(({ waypoints, ...rest }) => {
        return (
            {
                markers: waypoints.map((point, index) => {
                    return (<Marker position={point.location} key={index} />);
                }),
                ...rest
            }
        )
    }),
    withScriptjs,
    withGoogleMap
);

const Direction = enhance(({ clickHandler, rightClickHandler, markers, directions, defaultZoom, defaultCenter }) => (
    <GoogleMap
        defaultZoom={14}
        defaultCenter={new window.google.maps.LatLng(-19.932654, -43.936020)}
        onClick={clickHandler}
        onRightClick={rightClickHandler} >
        {markers}
        {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>)
);

export default Direction;