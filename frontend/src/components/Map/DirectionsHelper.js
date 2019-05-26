import { resolve } from "dns";

class DirectionHelper {
    constructor() {
        this.MIN_ROUTES_POINTS = 2;
        this.DEFAULT_TRAVEL_MODE = 'WALKING';
        this.INSUFFICIENT_POINTS_MSG = 'Pontos insuficientes para calcular uma rota ! É preciso de no mínimo ' + this.MIN_ROUTES_POINTS + ' !'; 
    }

    getRouteAPI (waypoints) {
        const { google } = window;
        const waypointsAux = waypoints.slice(0);
        const origin = waypointsAux.shift().location;
        const destination = waypointsAux.pop().location;
        const DirectionsService = new google.maps.DirectionsService();

        if (!waypoints.length || waypoints.length < this.MIN_ROUTES_POINTS) {
            alert(this.INSUFFICIENT_POINTS_MSG);
        } else {
            return new Promise( (resolve, reject) => {
                DirectionsService.route({
                    origin: origin,
                    destination: destination,
                    waypoints: waypointsAux,
                    travelMode: google.maps.TravelMode[this.DEFAULT_TRAVEL_MODE],
                }, (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        resolve(result);
                    } else {
                        alert(`Erro ao buscar rota : ${result}`);
                        reject();
                    }
                });

                DirectionsService.route({
                    origin: destination,
                    destination: origin,
                    waypoints: waypointsAux.reverse(),
                    travelMode: google.maps.TravelMode[this.DEFAULT_TRAVEL_MODE],
                }, (result, status) => {
                    
                });
            });
        }
    }
}

export default new DirectionHelper ();