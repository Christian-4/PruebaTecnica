// const WookieePeople = require('./wookieePeople');
const CommonPeople = require('./commonPeople');

const peopleFactory = async (id, app, lang) => {
    let Person = null;
    if (lang == 'wookiee') {
        // Person = new WookieePeople(id);
    } else {
        Person = new CommonPeople(id, app);
    }
    await Person.init();
    return Person;
}

module.exports = { peopleFactory }