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
  protected constructor(private repository: Repository<ENTITY>) {
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
    this.beforeSendingEntity(ent);
    return ent;
  }

  /**
   * create new entity
   * @param request
   */
  async create(request: ENTITY): Promise<ENTITY> {
    this.beforeSavingDatabase(request);
    request.createdAt = new Date();
    const ent: ENTITY = await this.repository.save(request);
    this.beforeSendingEntity(ent);

    return ent;
  }

  /**
   * full update entity with entity if inside
   * @param request
   */
  async update(request: ENTITY): Promise<ENTITY> {
    if (request.id == null) {
      throw new BadRequestError(TranslocoKeys.BAD_REQUEST_MISSING_ID);
    }

    this.beforeSavingDatabase(request);
    request.updatedAt = new Date();
    const ent: ENTITY = await this.repository.save(request);
    this.beforeSendingEntity(ent);

    return ent;
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
    this.beforeDeletingEntity(ent);
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
