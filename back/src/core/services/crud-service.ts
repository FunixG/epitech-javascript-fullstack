import {ApiEntity} from "../entities/api-entity";
import {DeleteResult, FindOptionsWhere, Repository} from "typeorm";
import {ApiError} from "../errors/api-error";
import {TranslocoKeys} from "../../transloco-keys";

/**
 * Injectable() annotation needed
 */
export abstract class CrudService<ENTITY extends ApiEntity> {

    /**
     * you will need to add anotation to the parameter repository InjectRepository(ENTITY)
     * @param repository
     * @protected
     */
    protected constructor(private repository: Repository<ENTITY>) {
    }

    /**
     * get an ent by id
     * Null if not found
     * @param id
     */
    async getById(id: number): Promise<ENTITY> | null {
        const query = {
            id: 1
        } as FindOptionsWhere<ENTITY>;

        const search: ENTITY[] = await this.repository.findBy(query);

        if (search.length === 0) {
            return null;
        } else {
            const ent: ENTITY = search[0];
            this.beforeSendingEntity(ent);
            return ent;
        }
    }

    /**
     * create new entity
     * @param request
     */
    async create(request: ENTITY): Promise<ENTITY> {
        this.beforeSavingDatabase(request);
        const ent: ENTITY = await this.repository.save(request);
        this.beforeSendingEntity(ent);

        return ent;
    }

    /**
     * full update entity with entity if inside
     * @param request
     */
    async update(request: ENTITY): Promise<ENTITY> | null {
        if (request.id == null) {
            return null;
        } else {
            this.beforeSavingDatabase(request);
            const ent: ENTITY = await this.repository.save(request);
            this.beforeSendingEntity(ent);

            return ent;
        }
    }

    /**
     * Remove entity by id
     * @param entId
     */
    async remove(entId: number): Promise<void> {
        const query = {
            id: 1
        } as FindOptionsWhere<ENTITY>;

        const search: ENTITY[] = await this.repository.findBy(query);

        if (search.length === 0) {
            return null;
        } else {
            const ent: ENTITY = search[0];
            this.beforeDeletingEntity(ent);
            const result: DeleteResult = await this.repository.delete(query);

            if (result.affected === undefined || result.affected === 0) {
                throw new ApiError(TranslocoKeys.ENTITY_NOT_FOUND);
            }
        }
    }

    beforeSavingDatabase(request: ENTITY): void {
    }

    beforeDeletingEntity(entity: ENTITY): void {
    }

    beforeSendingEntity(entity: ENTITY): void {
    }
}
