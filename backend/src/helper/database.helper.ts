import { getManager, ObjectType, Repository } from 'typeorm';

class DatabaseHelper<T> {
    repository: Repository<T>;

    constructor(entityClass: ObjectType<T>) {
        this.repository = getManager().getRepository(entityClass);
    }

    async save(entity:T) {
        try {
            return await this.repository.save(entity);
        } catch (e) {
            console.log(e);
            return undefined;
        }
    }

    async get(filter: object) {
        try {
            return await this.repository.findOne(filter);
        } catch (e) {
            console.log(e);
            return undefined;
        }
    }
}

export default DatabaseHelper;