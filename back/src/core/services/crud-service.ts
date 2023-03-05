import {DeleteResult, FindOptionsWhere, Repository} from 'typeorm';
import ApiEntity from '../entities/api-entity';
import BadRequestError from '../errors/bad-request-error';
import NotFoundError from '../errors/not-found-error';
import TranslocoKeys from '../transloco-keys';

/**
 * Injectable() annotation needed
 */
export default abstract class CrudService<ENTITY extends ApiEntity> {
  /**
   * you will need to add anotation to the parameter repository InjectRepository(ENTITY)
   * @param repository
   * @protected
   */
  protected constructor(protected repository: Repository<ENTITY>) {
  }

  /**
   * get an ent by id
   * Null if not found
   * @param id
   */
  async getById(id: number): Promise<ENTITY> {
    if (id === null) {
      throw new BadRequestError(TranslocoKeys.BAD_REQUEST_MISSING_ID);
    }

    const query = {
      id,
    } as FindOptionsWhere<ENTITY>;

    const search: ENTITY[] = await this.repository.findBy(query);

    if (search.length === 0) {
      throw new NotFoundError();
    }
    const ent: ENTITY = search[0];
    await this.beforeSendingEntity(ent);
    return ent;
  }

  async getBySearch(search: FindOptionsWhere<ENTITY>): Promise<ENTITY[]> {
    const entities: ENTITY[] = await this.repository.findBy(search);

    for (let i = 0; i < entities.length; ++i) {
      await this.beforeSendingEntity(entities[i]);
    }
    return entities;
  }

  /**
   * create new entity
   * @param request
   */
  async create(request: ENTITY): Promise<ENTITY> {
    await this.beforeSavingDatabase(request);

    request.createdAt = new Date();

    try {
      const ent: ENTITY = await this.repository.save(request);
      await this.beforeSendingEntity(ent);
      return ent;
    } catch (error) {
      throw new BadRequestError(TranslocoKeys.BAD_REQUEST_MISSING_REQUIRED_PARTS);
    }
  }

  /**
   * full update entity with entity if inside
   * @param request
   */
  async update(request: ENTITY): Promise<ENTITY> {
    if (request.id == null) {
      throw new BadRequestError(TranslocoKeys.BAD_REQUEST_MISSING_ID);
    }

    await this.beforeSavingDatabase(request);
    request.updatedAt = new Date();

    try {
      const ent: ENTITY = await this.repository.save(request);
      await this.beforeSendingEntity(ent);
      return ent;
    } catch (error) {
      throw new BadRequestError(TranslocoKeys.BAD_REQUEST_MISSING_REQUIRED_PARTS);
    }
  }

  /**
   * Remove entity by id
   * @param entId
   */
  async remove(entId: number): Promise<DeleteResult> {
    if (entId === null) {
      throw new BadRequestError(TranslocoKeys.BAD_REQUEST_MISSING_ID);
    }

    const query = {
      id: entId,
    } as FindOptionsWhere<ENTITY>;

    const search: ENTITY[] = await this.repository.findBy(query);

    if (search.length === 0) {
      throw new NotFoundError();
    }
    const ent: ENTITY = search[0];
    await this.beforeDeletingEntity(ent);
    const result: DeleteResult = await this.repository.delete(query);

    if (result.affected === undefined || result.affected === 0) {
      throw new NotFoundError();
    }
    return result;
  }

  abstract beforeSavingDatabase(request: ENTITY): void;

  abstract beforeDeletingEntity(entity: ENTITY): void;

  abstract beforeSendingEntity(entity: ENTITY): void;
}
