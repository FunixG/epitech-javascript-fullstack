import { DeleteResult, FindOptionsWhere, Repository } from 'typeorm';
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
   * @param relations
   * @protected
   */
  protected constructor(
    protected repository: Repository<ENTITY>,
    protected relations: string[] = [],
  ) {
  }

  /**
   * Fetch all database
   */
  async getAll(): Promise<ENTITY[]> {
    const list: ENTITY[] = await this.repository.find({
      relations: this.relations,
    });

    await Promise.all(list.map(async (entity: ENTITY) => {
      await this.beforeSendingEntity(entity);
    }));
    return list;
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

    const search: ENTITY = await this.repository.findOne({
      where: query,
      relations: this.relations,
    });
    if (search === null) {
      throw new NotFoundError();
    }

    await this.beforeSendingEntity(search);
    return search;
  }

  async getBySearch(search: FindOptionsWhere<ENTITY>): Promise<ENTITY[]> {
    const entities: ENTITY[] = await this.repository.find({
      where: search,
      relations: this.relations,
    });

    await Promise.all(entities.map(async (entity: ENTITY) => {
      await this.beforeSendingEntity(entity);
    }));
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

    const search: ENTITY = await this.repository.findOne({
      where: query,
      relations: this.relations,
    });
    if (search === null) {
      throw new NotFoundError();
    }

    await this.beforeDeletingEntity(search);
    const result: DeleteResult = await this.repository.delete(query);

    if (result.affected === undefined || result.affected === 0) {
      throw new NotFoundError();
    }
    return result;
  }

  abstract beforeSavingDatabase(request: ENTITY): Promise<void>;

  abstract beforeDeletingEntity(entity: ENTITY): Promise<void>;

  abstract beforeSendingEntity(entity: ENTITY): Promise<void>;
}
