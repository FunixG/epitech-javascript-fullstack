import {DeleteResult} from 'typeorm';
import ApiEntity from '../entities/api-entity';
import CrudService from '../services/crud-service';
import {Body, Delete, Get, Param, Patch, Post} from "@nestjs/common";

export default class CrudResource<ENTITY extends ApiEntity, SERVICE extends CrudService<ENTITY>> {
  constructor(private service: SERVICE) {
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
