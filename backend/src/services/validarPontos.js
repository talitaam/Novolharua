import dbService from "../util/db";

class ValidarPontos {
	constructor() {
		this.points = [];
	}

	getpoints(){
		return this.points.slice(0);
	}

	addNaRotaVerdadeira (point) {
    this.points.push(point);
	};

	getMostValuablePoints (points) {
	    const MIN_DISTANCE_FOR_TWO_POINTS = 80,
	          MAX_DISTANCE_FOR_TWO_POINTS = 200;
	    let i = 0,
	        j = i + 1,
	        distance,
	        auxDistance,
	        aux2Distance;

	    while ( i < points.lenght - 1) {
	        if( i == 0 ) {
	            addNaRotaVerdadeira(points[i]);
	        }

	        distance = getDistanceFromLatLonInKm(points[i], points[i + 1]);

	        if (distance >= MIN_DISTANCE_FOR_TWO_POINTS || i == points.lenght - 2 ) {
	            addNaRotaVerdadeira(points[i+1]);
	            i++;
	        } else {
	            let j = i + 1,
	                auxDistance = distance,
	                aux2Distance;

	            while( aux < MIN_DISTANCE_FOR_TWO_POINTS && j < points.lenght ) {
	                aux2Distance = getDistanceFromLatLonInKm(points[j], points[j+1]);
	                if( aux2Distance > MAX_DISTANCE_FOR_TWO_POINTS || (j == points.lenght - 2) ) {
	                    addNaRotaVerdadeira(points[j]);
	                    addNaRotaVerdadeira(points[j + 1]);
	                    auxDistance = 81;
	                } else {
	                    auxDistance += aux2Distance;
	                    if(auxDistance >= MIN_DISTANCE_FOR_TWO_POINTS) {
	                        addNaRotaVerdadeira( points[j + 1]);
	                    }
	                    j++;
	                }
	            }
	            i = j;
	        }
	    }
	};

	getDistanceFromLatLonInKm (position1, position2) {
	    "use strict";
	    var deg2rad = function (deg) { return deg * (Math.PI / 180); },
	        R = 6371,
	        dLat = deg2rad(position2.lat - position1.lat),
	        dLng = deg2rad(position2.lng - position1.lng),
	        a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
	            + Math.cos(deg2rad(position1.lat))
	            * Math.cos(deg2rad(position1.lat))
	            * Math.sin(dLng / 2) * Math.sin(dLng / 2),
	        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	    return ((R * c *1000).toFixed());
	}
}

export default new ValidarPontos ();
