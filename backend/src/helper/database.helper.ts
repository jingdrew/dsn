import { getManager, ObjectType, Repository } from 'typeorm';

class DatabaseHelper<T> {
    repository: Repository<T>;

    constructor(entityClass: ObjectType<T>) {
        this.repository = getManager().getRepository(entityClass);
    }

    async save(entity: T) {
        return await this.repository.save(entity);
    }

    async get(filter: object) {
        return await this.repository.findOne(filter);
    }
}

export default DatabaseHelper;