const AbstractPeople = require("./abstractPeople");

module.exports = class CommonPeople extends AbstractPeople {
    constructor(id, app) {
        super(id, app)
    }
}