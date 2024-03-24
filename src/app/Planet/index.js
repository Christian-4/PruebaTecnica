const CommonPlanet = require('./Planet');

const planetFactory = async (id, app) => {
  const Planet = new CommonPlanet(id, app);
  await Planet.init();
  return Planet;
}

module.exports = { planetFactory }