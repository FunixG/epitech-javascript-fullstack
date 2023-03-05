import {Controller} from '@nestjs/common';
import CrudResource from '../../core/resources/crud-resource';
import Product from '../entities/product.entity';
import ProductsService from '../services/products.service';

@Controller('products')
export default class ProductsController extends CrudResource<Product, ProductsService> {

}
