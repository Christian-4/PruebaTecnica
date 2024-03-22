
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
      res.status(500).json({Error: err})
    }
  });

  server.get('/hfswapi/getPlanet/:id', async (req, res) => {
    res.sendStatus(501);
  });

  server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
    res.sendStatus(501);
  });

  server.get('/hfswapi/getLogs', async (req, res) => {
    const data = await app.db.logging.findAll();
    res.send(data);
  });

}

module.exports = applySwapiEndpoints;