class Repository {
    constructor(props) {
        this.props = props;
        this.data = new Map();
        this.id = 0;
    }

    add(entity) {
        //Function add(entity) – adds an entity to the data; if successful, returns the resulting ID
        this._validateProperties(entity);
        this.data.set(this.id, entity);
        return this.id++;
    }

    get(id) {
        this._validateId(id);

        return this.data.get(id);
    }

    update(id, newEntity) {
        //– replaces the entity with the given id with the new entity
        this._validateId(id);
        this._validateProperties(newEntity);

        this.data.set(id, newEntity);
    }

    del(id) {
        this._validateId(id);
        this.data.delete(id);
    }

    get count() {
        return this.data.size;
    }

    _validateProperties(entity) {
        for (let propName in this.props) {
            if (!entity.hasOwnProperty(propName)) {
                throw Error(`Property ${propName} is missing from the entity!`);
            }

            if (typeof entity[propName] !== this.props[propName]) {
                throw TypeError(`Property ${propName} is of incorrect type!`);
            }
        }
    }

    _validateId(id) {
        if (!this.data.has(id)) {
            throw Error(`Entity with id: ${id} does not exist!`);
        }
    }
}

module.exports = Repository;
