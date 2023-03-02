import {DeleteResult} from 'typeorm';
import ApiEntity from '../entities/api-entity';
import CrudService from '../services/crud-service';

export default class CrudResource<ENTITY extends ApiEntity, SERVICE extends CrudService<ENTITY>> {
  constructor(private service: SERVICE) {
  }

  async getById(id: number): Promise<ENTITY> {
    return this.service.getById(id);
  }

  async create(request: ENTITY): Promise<ENTITY> {
    return this.service.create(request);
  }

  async update(request: ENTITY): Promise<ENTITY> {
    return this.service.update(request);
  }

  async remove(entId: number): Promise<DeleteResult> {
    return this.service.remove(entId);
  }
}
