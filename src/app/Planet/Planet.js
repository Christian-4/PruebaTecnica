module.exports = class Planet {
    constructor(id, app) {
        this.id = id;
        this.app = app;
    }

    async init() {
        let planet = await this.app.db.swPlanet.findOne({ where: { id: this.id } });
        if (!planet) {
            planet = await this.app.swapiFunctions.genericRequest(`https://swapi.py4e.com/api/planets/${this.id}`, 'GET', null, true);
        }

        this.name = planet.name;

        if (typeof planet.gravity === "number" || planet.gravity === "unknown" || planet.gravity === "N/A") {
            this.gravity = planet.gravity;
        } else {
            this.gravity = Number(planet.gravity.split(" ")[0])
        }
    }

    getName() {
        return this.name;
    }

    getGravity() {
        return this.gravity;
    }

    getPlanetDataMapped() {
        return {
            name: this.name,
            gravity: this.gravity
        }
    }
}