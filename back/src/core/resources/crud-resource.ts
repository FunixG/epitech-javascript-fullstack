import {DeleteResult} from 'typeorm';
import {Body, Delete, Get, Param, Patch, Post,} from '@nestjs/common';
import ApiEntity from '../entities/api-entity';
import CrudService from '../services/crud-service';

export default class CrudResource<ENTITY extends ApiEntity, SERVICE extends CrudService<ENTITY>> {
  constructor(protected service: SERVICE) {
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<ENTITY> {
    return this.service.getById(id);
  }

  @Post()
  async create(@Body() request: ENTITY): Promise<ENTITY> {
    return this.service.create(request);
  }

  @Patch()
  async update(@Body() request: ENTITY): Promise<ENTITY> {
    return this.service.update(request);
  }

  @Delete(':id')
  async remove(@Param('id') entId: number): Promise<DeleteResult> {
    return this.service.remove(entId);
  }
}
