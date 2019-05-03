import var_dump from 'var_dump';

const getMostValuablePoints = ( points ) => {
    const MIN_DISTANCE_FOR_TWO_POINTS = 80,
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

        if (distance >= MIN_DISTANCE_FOR_TWO_POINTS ) {
            mostValuablePoints.push(points[i + 1]);
            i++;
        } else if(i < POINTS_SIZE - 1) {
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

export { 
    getMostValuablePoints 
};