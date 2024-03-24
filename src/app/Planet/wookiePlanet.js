const Planet = require("./Planet");

module.exports = class WookieePlanet extends Planet {
  constructor(id, app) {
    super(id, app)
  }

  async init() {
    let planet = await this.app.swapiFunctions.genericRequest(`https://swapi.py4e.com/api/planets/${this.id}?format=wookiee`, 'GET', null, true);
    this.name = planet.whrascwo;

    if (planet.rrrcrahoahaoro === "huwhorwhooohwh" || planet.rrrcrahoahaoro === "N/A") {
      this.gravity = planet.rrrcrahoahaoro;
    } else {
      this.gravity = Number(planet.rrrcrahoahaoro.split(" ")[0])
    }
  }
}