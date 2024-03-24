const WookieePlanet = require('./wookiePlanet');
const CommonPlanet = require('./Planet');

const planetFactory = async (id, app, isWookiee) => {
  let Planet = null;
  if (isWookiee) {
    Planet = new WookieePlanet(id, app)
  } else {
    Planet = new CommonPlanet(id, app);
  }
  await Planet.init();
  return Planet;
}

module.exports = { planetFactory }