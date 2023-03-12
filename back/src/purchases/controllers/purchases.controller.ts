import {Controller, Get, Headers, Query} from '@nestjs/common';
import CrudResource from '../../core/resources/crud-resource';
import Purchase from '../entities/purchase.entity';
import PurchasesService from '../services/purchases.service';
import UserService from "../../user/services/user.service";
import Product from "../../products/entities/product.entity";
import User from "../../user/entities/user.entity";

@Controller('purchases')
export default class PurchasesController extends CrudResource<Purchase, PurchasesService> {
  constructor(readonly service: PurchasesService,
              readonly userService: UserService) {
    super(service);
  }

  @Get('payment')
  async actual(@Headers('authorization') authHeader, @Query('product-id') productId: number) {
    const token = authHeader.split(' ')[1];
    const user: User = await this.userService.findUserByJwt(token);

    const request = new Purchase();
    request.product = new Product();
    request.user = new User();
    request.product.id = productId;
    request.user.id = user.id;

    return super.create(request);
  }
}
