const WookieePeople = require('./wookieePeople');
const CommonPeople = require('./commonPeople');

const peopleFactory = async (id, app, isWookiee) => {
    let Person = null;
    if (isWookiee) {
        Person = new WookieePeople(id, app, isWookiee);
    } else {
        Person = new CommonPeople(id, app);
    }
    await Person.init();
    return Person;
}

module.exports = { peopleFactory }