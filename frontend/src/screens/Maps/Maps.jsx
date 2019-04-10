import React from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const CustomSkinMap = withScriptjs(
  withGoogleMap(props => (
    <GridContainer>
      <GridItem xs="12" md="3" sm="12">
        <GoogleMap
          defaultZoom={13}
          defaultCenter={{ lat: -20.748817, lng: -50.985428 }}
          defaultOptions={{
            scrollwheel: false,
            zoomControl: true,
            styles: [
              {
                featureType: "water",
                stylers: [
                  { saturation: 43 },
                  { lightness: -11 },
                  { hue: "#0088ff" }
                ]
              },
              {
                featureType: "road",
                elementType: "geometry.fill",
                stylers: [
                  { hue: "#ff0000" },
                  { saturation: -100 },
                  { lightness: 99 }
                ]
              },
              {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#808080" }, { lightness: 54 }]
              },
              {
                featureType: "landscape.man_made",
                elementType: "geometry.fill",
                stylers: [{ color: "#ece2d9" }]
              },
              {
                featureType: "poi.park",
                elementType: "geometry.fill",
                stylers: [{ color: "#ccdca1",  visibility: "off" }]
              },
              {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{ color: "#767676",  visibility: "off" }]
              },
              {
                featureType: "road",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#ffffff",  visibility: "off" }]
              },
              { featureType: "poi", stylers: [{ visibility: "off" }] },
              {
                featureType: "landscape.natural",
                elementType: "geometry.fill",
                stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
              },
              { featureType: "poi.park", stylers: [{ visibility: "off" }] },
              {
                featureType: "poi.sports_complex",
                stylers: [{ visibility: "off" }]
              },
              { featureType: "poi.medical", stylers: [{  visibility: "off" }] },
              {
                featureType: "poi.business",
                stylers: [{ visibility: "off" }]
              }
            ]
          }}
        >
          <Marker position={{ lat: 40.748817, lng: 120.985428 }} />
        </GoogleMap>
      </GridItem>
    </GridContainer>
  ))
);



function Maps({ ...props }) {
  return (
    <div>
      <CustomSkinMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAXRoo8kh7I1XuGA_OjinkIoZ4mEJ0w4j4&callback=initMap"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}

export default Maps;
