import var_dump from 'var_dump';
import turf from '@turf/turf';

const getMostValuablePoints = (points) => {
    const MIN_DISTANCE_FOR_TWO_POINTS = 40,
        MAX_DISTANCE_FOR_TWO_POINTS = 200,
        POINTS_SIZE = points.length;
    let mostValuablePoints = [],
        i = 0,
        j = i + 1,
        distance,
        auxDistance,
        aux2Distance;

    while (i < POINTS_SIZE - 1) {
        if (i === 0) {
            mostValuablePoints.push(points[i]);
            i++;
        }

        distance = getDistanceFromLatLonInKm(points[i], points[i + 1]);

        if (distance >= MIN_DISTANCE_FOR_TWO_POINTS) {
            mostValuablePoints.push(points[i + 1]);
            i++;
        } else if (i < POINTS_SIZE - 1) {
            j = i + 1;
            auxDistance = distance;
            aux2Distance;

            while (auxDistance < MIN_DISTANCE_FOR_TWO_POINTS && j < POINTS_SIZE - 1) {
                aux2Distance = getDistanceFromLatLonInKm(points[j], points[j + 1]);
                if (aux2Distance > MAX_DISTANCE_FOR_TWO_POINTS || (j === POINTS_SIZE - 2)) {
                    mostValuablePoints.push(points[j]);
                    mostValuablePoints.push(points[j + 1]);
                    auxDistance = 81;
                } else {
                    auxDistance += aux2Distance;
                    if (auxDistance >= MIN_DISTANCE_FOR_TWO_POINTS) {
                        mostValuablePoints.push(points[j + 1]);
                    }
                    j++;
                }
            }
            i = j;
        }
    }

    return mostValuablePoints;
};

const getDistanceFromLatLonInKm = (pos1, pos2) => {
    let deg2rad = (deg) => deg * (Math.PI / 180),
        R = 6371,
        dLat = deg2rad(pos2.lat - pos1.lat),
        dLng = deg2rad(pos2.lng - pos1.lng),
        a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(deg2rad(pos1.lat))
            * Math.cos(deg2rad(pos1.lat))
            * Math.sin(dLng / 2) * Math.sin(dLng / 2),
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return ((R * c * 1000).toFixed());
};

const getCommomPoints = (pointsA, pointsB) => {
    return pointsA.filter(
        pointA => pointsB.filter(
            pointB => (pointA.lat === pointB.lat && pointA.lng === pointB.lng)
        ).length > 0
    );
}

const compressArrayPoints = list => {
    if (list.length <= 1) {
        return list
    } else if (list[0][0] === list[1][0] && list[0][1] === list[1][1]) {
        return compressArrayPoints(list.slice(1, ))
    } else {
        return [list.shift()].concat(compressArrayPoints(list))
    }
}

// Using turfjs to limit the decimal to .6 format.
const truncateCoordinates = turfPoints => {
    const turf = require('@turf/turf');
    const turfLineString = turf.lineString(turfPoints);

    for (var i = 0; i < turfLineString.geometry.coordinates.length; i++){
        var point = turf.point(turfLineString.geometry.coordinates[i]); //transforma um par de coordenadas em um point
        var truncated = turf.truncate(point, {precision: 5, coordinates: 2}); //limite para 6 casas decimais a lat e a lng
        turfLineString.geometry.coordinates[i] = truncated.geometry.coordinates; //reescreve as coordenadas já truncadas
    }
    
    return turfLineString;
}

const distanciaCoord = (overlapping) => {
    var retornaOverlaps = [];
    let sizeArrayResposta = overlapping.features.length;
    let tamanhoMaximo = 60;

    for(var i = 0; i < sizeArrayResposta; i++){
        var ultimoIndice = overlapping.features[i].geometry.coordinates.length;
        var maior = 0;
        var overlapCoordinates = {};
        for(var j = 0; j < ultimoIndice-1; j++){
            for(var k = j+1; k < ultimoIndice; k++){
                var from = overlapping.features[i].geometry.coordinates[j];
                var to = overlapping.features[i].geometry.coordinates[k];
                var distance = turf.distance(from, to, {units: 'meters'});
                if (distance > tamanhoMaximo) {
                    console.log("Rota inválidada");
                    if (distance > maior){
                        maior = distance;
                        overlapCoordinates = {lat1: from[0], lng1: from[1], lat2: to[0], lng2: to[1]};
                        //trecho correspondente entre coordenada 1 (lat1 e lng1) e coordenada2 (lat2 e lng2)
                    }
                }
            }
        }
        if (maior != 0){
            retornaOverlaps.push(overlapCoordinates);
        }
    }
    return retornaOverlaps;
};

const getTrechosComOverlap = (conflitantRoute, toSaveRoute) => {
    const turf = require('@turf/turf');
    var_dump(conflitantRoute);
    const turfConflitantRoute = turf.lineString(conflitantRoute);
    const overlapping = turf.lineOverlap(toSaveRoute, turfConflitantRoute, {tolerance: 0.005}); 
    
    return distanciaCoord(overlapping);
}

export {
    getMostValuablePoints,
    getCommomPoints,
    truncateCoordinates,
    compressArrayPoints,
    getTrechosComOverlap
};