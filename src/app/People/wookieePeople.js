const AbstractPeople = require("./abstractPeople");

module.exports = class WookieePeople extends AbstractPeople {
  constructor(id, app, isWookie) {
    super(id, app, isWookie)
  }

  async init() {
    const person = await this.app.swapiFunctions.genericRequest(`https://swapi.py4e.com/api/people/${this.id}?format=wookiee`, 'GET', null, true);
    
    this.name = person.whrascwo;
    this.mass = person.scracc;
    this.height = person.acwoahrracao;
    this.homeworldId = person.acooscwoohoorcanwa.split('/').reverse()[1]
    const planet = await this.app.swapiFunctions.genericRequest(`https://swapi.py4e.com/api/planets/${this.homeworldId}?format=wookiee`, 'GET', null, true);
    this.homeworldName = planet.whrascwo
  }
}