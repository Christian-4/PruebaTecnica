
const _isWookieeFormat = (req) => {
  if (req.query.format && req.query.format == 'wookiee') {
    return true;
  }
  return false;
}


const applySwapiEndpoints = (server, app) => {

  server.get('/hfswapi/test', async (req, res) => {
    const data = await app.swapiFunctions.genericRequest('https://swapi.py4e.com/api/', 'GET', null, true);
    res.send(data);
  });

  server.get('/hfswapi/getPeople/:id', async (req, res) => {
    try {
      let personMapped;
      const id = req.params.id;
      const person = await app.db.swPeople.findOne({ where: { id } });
      if (person) {
        personMapped = {
          name: person.name,
          mass: person.mass,
          height: person.height,
          homeworldName: person.homeworld_name,
          homeworldId: person.homeworld_id
        }
      } else {
        const person = await app.swapiFunctions.genericRequest(`https://swapi.py4e.com/api/people/${id}`, 'GET', null, true);
        const planetId = person.homeworld.split('/').reverse()[1]
        const planet = await app.swapiFunctions.genericRequest(`https://swapi.py4e.com/api/planets/${planetId}`, 'GET', null, true);
        personMapped = {
          name: person.name,
          mass: person.mass,
          height: person.height,
          homeworldName: planet.name,
          homeworldId: planetId
        }
      }
      res.status(200).json(personMapped)
    } catch (err) {
      res.status(500).json({ Error: err.message })
    }
  });

  server.get('/hfswapi/getPlanet/:id', async (req, res) => {
    try {
      let planetMapped;
      const id = req.params.id;
      const planet = await app.db.swPlanet.findOne({ where: { id } });
      if (planet) {
        planetMapped = {
          name: planet.name,
          gravity: planet.gravity
        }
      } else {
        const planet = await app.swapiFunctions.genericRequest(`https://swapi.py4e.com/api/planets/${id}`, 'GET', null, true);
        planetMapped = {
          name: planet.name,
          gravity: planet.gravity,
        }
      }
      res.status(200).json(planetMapped)
    } catch (err) {
      res.status(500).json({ Error: err.message })
    }
  });

  server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
    try {
      let randomPerson, randomPlanet
      const peopleInfo = await app.swapiFunctions.genericRequest(`https://swapi.py4e.com/api/people`, 'GET', null, false);
      const planetsInfo = await app.swapiFunctions.genericRequest(`https://swapi.py4e.com/api/planets`, 'GET', null, false);
      const randomPeopleNumber = Math.floor(Math.random() * peopleInfo.count) + 1
      const randomPlanetsNumber = Math.floor(Math.random() * planetsInfo.count) + 1
      randomPerson = await app.db.swPeople.findOne({ where: { id: randomPeopleNumber } });
      randomPlanet = await app.db.swPlanet.findOne({ where: { id: randomPlanetsNumber } });
      if (!randomPerson) {
        randomPerson = await app.swapiFunctions.genericRequest(`https://swapi.py4e.com/api/people/${randomPeopleNumber}`, 'GET', null, true);
      }

      if (!randomPlanet) {
        randomPlanet = await app.swapiFunctions.genericRequest(`https://swapi.py4e.com/api/planets/${randomPlanetsNumber}`, 'GET', null, true);
      }

      if (randomPerson.homeworld?.split('/').reverse()[1] == randomPlanetsNumber || randomPerson.homeworld_id?.split('/').reverse()[1] == randomPlanetsNumber) {
        throw new Error('Its the native planet of the person');
      }

      const personWeight = {
        person: randomPerson.name,
        planet: randomPlanet.name,
        weight: typeof randomPlanet.gravity === 'number' ? (randomPerson.mass * randomPlanet.gravity).toFixed(2) :
          Number((randomPerson.mass * randomPlanet.gravity.replace(/[^0-9\.]/g, '')).toFixed(2))
      }

      res.status(200).json(personWeight)
    } catch (err) {
      res.status(500).json({ Error: err.message })
    }
  });

  server.get('/hfswapi/getLogs', async (req, res) => {
    const data = await app.db.logging.findAll();
    res.send(data);
  });

}

module.exports = applySwapiEndpoints;