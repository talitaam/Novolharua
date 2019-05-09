class DirectionHelper {
    constructor() {
        this.MIN_ROUTES_POINTS = 2;
        this.DEFAULT_TRAVEL_MODE = 'WALKING';
        this.INSUFFICIENT_POINTS_MSG = 'Pontos insuficientes para calcular uma rota ! É preciso de no mínimo ' + this.MIN_ROUTES_POINTS + ' !'; 
    }

    getRouteAPI (waypoints, callback) {
        const { google } = window;
        
        if (!waypoints.length || waypoints.length < this.MIN_ROUTES_POINTS) {
            alert(this.INSUFFICIENT_POINTS_MSG);
        } else {
            const waypointsAux = waypoints.slice(0);
            const origin = waypointsAux.shift().location;
            const destination = waypointsAux.pop().location;
            const DirectionsService = new google.maps.DirectionsService();

            DirectionsService.route({
                origin: origin,
                destination: destination,
                waypoints: waypointsAux,
                travelMode: google.maps.TravelMode[this.DEFAULT_TRAVEL_MODE],
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    callback(result);
                } else {
                    alert(`Erro ao buscar rota : ${result}`);
                }
            });
        }
    }
}

export default new DirectionHelper ();