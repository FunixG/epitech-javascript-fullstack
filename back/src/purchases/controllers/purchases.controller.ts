import {
  Controller, Headers, Post, Query, UseGuards,
} from '@nestjs/common';
import CrudResource from '../../core/resources/crud-resource';
import Purchase from '../entities/purchase.entity';
import PurchasesService from '../services/purchases.service';
import UserService from '../../user/services/user.service';
import Product from '../../products/entities/product.entity';
import User from '../../user/entities/user.entity';
import {ApiBearerAuth} from "@nestjs/swagger";
import {Roles} from "../../user/entities/roles.decorator";
import JwtAuthGuard from "../../user/services/jwt.auth.guard";
import RolesAuthGuard from "../../user/services/roles.auth.guard";
import {use} from "passport";
import ProductsService from "../../products/services/products.service";

@Controller('purchases')
export default class PurchasesController extends CrudResource<Purchase, PurchasesService> {
  constructor(
    readonly service: PurchasesService,
    readonly userService: UserService,
    readonly productService: ProductsService
  ) {
    super(service);
  }

  @Post('payment')
  async payment(@Headers('authorization') authHeader, @Query('product-id') productId: number) {
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
