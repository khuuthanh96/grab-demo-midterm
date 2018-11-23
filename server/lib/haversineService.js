const haversine = require("haversine");

const findNearestDriver = (driverList, clientPoint) => {
    let distanceArray = [];
    driverList.forEach(driver => {
        const start = {
            lat: parseFloat(driver.lat),
            lon: parseFloat(driver.long)
        }

        const end = {
            lat: parseFloat(clientPoint.lat),
            lon: parseFloat(clientPoint.lng)
        }
        const distance = haversine(start, end, {format: "{lon,lat}"});
        distanceArray.push({ dist: distance, id: driver._id, name: driver.name })
    })

    let nearestDriver = distanceArray[0]
    distanceArray.forEach(obj => {
        if(obj.dist < nearestDriver.dist) {
            nearestDriver = obj
        }
    })

    return nearestDriver
}

module.exports = { findNearestDriver }