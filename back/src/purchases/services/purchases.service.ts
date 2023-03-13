import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import Purchase from '../entities/purchase.entity';
import CrudService from '../../core/services/crud-service';
import UserService from '../../user/services/user.service';
import ProductsService from '../../products/services/products.service';
import User from '../../user/entities/user.entity';
import Product from '../../products/entities/product.entity';
import BadRequestError from '../../core/errors/bad-request-error';
import TranslocoKeys from '../../core/transloco-keys';

@Injectable()
export default class PurchasesService extends CrudService<Purchase> {
  private readonly logger = new Logger(PurchasesService.name);

  constructor(
  @InjectRepository(Purchase) repository: Repository<Purchase>,
    private readonly userService: UserService,
    private readonly productService: ProductsService,
  ) {
    super(repository, ['user', 'product']);
  }

  async beforeDeletingEntity(entity: Purchase): Promise<void> {
    this.logger.log(`removing purchase id ${entity.id} product name: ${entity.product.name} user: ${entity.user.username}`);
  }

  async beforeSavingDatabase(request: Purchase): Promise<void> {
    if (request.id !== null && request.id !== undefined) {
      throw new BadRequestError(TranslocoKeys.BAD_REQUEST_NOT_PATCHABLE_ENTITY);
    }

    const user: User = await this.userService.getById(request.user.id);
    const product: Product = await this.productService.getById(request.product.id);
    request.user = user;
    request.product = product;
  }

  async beforeSendingEntity(entity: Purchase): Promise<void> {
    this.logger.log(`sending data purchase id ${entity.id} product name: ${entity.product.name} user: ${entity.user.username}`);
    entity.user.password = null; // eslint-disable-line no-param-reassign
  }
}
