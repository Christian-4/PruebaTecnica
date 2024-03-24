module.exports = class AbstractPeople {

    constructor(id, app, isWookie) {
        if (this.constructor == AbstractPeople) {
            throw new Error("Abstract classes can't be instantiated.");
        }

        this.id = id;
        this.app = app;
        this.isWookie = isWookie;
    }

    async init() {
        let person = await this.app.db.swPeople.findOne({ where: { id: this.id } });
        if (!person) {
            person = await this.app.swapiFunctions.genericRequest(`https://swapi.py4e.com/api/people/${this.id}`, 'GET', null, true);
        }

        this.name = person.name;
        this.mass = person.mass;
        this.height = person.height;
        this.homeworldId = person.homeworld_id?.split('/').reverse()[0] || person.homeworld.split('/').reverse()[1]
        this.homeworldName = person.homeworld_name ||
            (await this.app.swapiFunctions.genericRequest(`https://swapi.py4e.com/api/planets/${this.homeworldId}`, 'GET', null, true)).name

    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getMass() {
        return this.mass;
    }

    getHeight() {
        return this.height;
    }

    getHomeworldName() {
        return this.homeworldName;
    }

    getHomeworlId() {
        return this.homeworldId;
    }

    getPersonDataMapped() {
        return {
            name: this.name,
            mass: this.mass,
            height: this.height,
            homeworldName: this.homeworldName,
            homeworldId: this.homeworldId
        }
    }

    async getWeightOnPlanet(planetId) {
        if (planetId == this.homeworldId) {
            throw new Error('Its the native planet of the person');
        } else {
            const Planet = await this.app.planet.planetFactory(planetId, this.app, this.isWookie)
            return {
                person: this.name,
                planet: Planet.getName(),
                weight: this.app.swapiFunctions.getWeightOnPlanet(this.mass.replaceAll(",", ""), Planet.getGravity())
            }
        }
    }
}