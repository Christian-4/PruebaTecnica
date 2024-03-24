const fetch = require('node-fetch');

const getWeightOnPlanet = (mass, gravity) => {
    if (typeof gravity !== "number") {
        return "Cant calculate Weight because the gravity of this planet is unknown or N/A"
    } else if (mass === "unknown" || mass === "huwhorwhooohwh") {
        return "Cant calculate Weight because the mass of this person is unknown"
    } else {
        return mass * gravity;
    }
}

const genericRequest = async (url, method, body, logging = false) => {
    let options = {
        method: method
    }
    if (body) {
        options.body = body;
    }
    const response = await fetch(url, options);
    const data = await response.json();
    if (logging) {
        console.log(data);
    }
    return data;
}

module.exports = {
    getWeightOnPlanet,
    genericRequest
}