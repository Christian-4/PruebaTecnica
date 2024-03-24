
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
      const { id } = req.params;
      const Person = await app.people.peopleFactory(id, app, _isWookieeFormat(req))
      const dataPerson = Person.getPersonDataMapped();
      res.status(200).json(dataPerson)
    } catch (err) {
      res.status(500).json({ Error: err.message })
    }
  });

  server.get('/hfswapi/getPlanet/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const Planet = await app.planet.planetFactory(id, app, _isWookieeFormat(req))
      const dataPlanet = Planet.getPlanetDataMapped();
      res.status(200).json(dataPlanet)
    } catch (err) {
      res.status(500).json({ Error: err.message })
    }
  });

  server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
    try {
      const peopleInfo = await app.swapiFunctions.genericRequest(`https://swapi.py4e.com/api/people`, 'GET', null, false);
      const planetsInfo = await app.swapiFunctions.genericRequest(`https://swapi.py4e.com/api/planets`, 'GET', null, false);
      const randomPeopleNumber = Math.floor(Math.random() * peopleInfo.count) + 1;
      const randomPlanetsNumber = Math.floor(Math.random() * planetsInfo.count) + 1;
      const randomPerson = await app.people.peopleFactory(randomPeopleNumber, app, _isWookieeFormat(req));

      const weightData = await randomPerson.getWeightOnPlanet(randomPlanetsNumber)

      res.status(200).json(weightData)
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