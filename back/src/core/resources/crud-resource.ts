import {DeleteResult} from 'typeorm';
import {Body, Delete, Get, Param, Patch, Post, UseGuards,} from '@nestjs/common';
import {ApiBearerAuth} from '@nestjs/swagger';
import ApiEntity from '../entities/api-entity';
import CrudService from '../services/crud-service';
import JwtAuthGuard from '../../user/services/jwt.auth.guard';
import RolesAuthGuard from '../../user/services/roles.auth.guard';
import {Roles} from '../../user/entities/roles.decorator';

export default class CrudResource<ENTITY extends ApiEntity, SERVICE extends CrudService<ENTITY>> {
  constructor(protected service: SERVICE) {
  }

  @Get()
  async getAll(): Promise<ENTITY[]> {
    return this.service.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<ENTITY> {
    return this.service.getById(id);
  }

  @Post()
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesAuthGuard)
  async create(@Body() request: ENTITY): Promise<ENTITY> {
    return this.service.create(request);
  }

  @Patch()
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesAuthGuard)
  async update(@Body() request: ENTITY): Promise<ENTITY> {
    return this.service.update(request);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesAuthGuard)
  async remove(@Param('id') entId: number): Promise<DeleteResult> {
    return this.service.remove(entId);
  }
}
