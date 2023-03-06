import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import Product from '../entities/product.entity';
import CrudService from '../../core/services/crud-service';

@Injectable()
export default class ProductsService extends CrudService<Product> {
  private readonly logger = new Logger(ProductsService.name);

  constructor(@InjectRepository(Product) repository: Repository<Product>) {
    super(repository);
  }

  async beforeSavingDatabase(request: Product): Promise<void> {
    this.logger.log(`save product ${request.name}`);
  }

  async beforeDeletingEntity(entity: Product): Promise<void> {
    this.logger.log(`remove product ${entity.name}`);
  }

  async beforeSendingEntity(entity: Product): Promise<void> {
    this.logger.log(`product requested ${entity.name}`);
  }
}
