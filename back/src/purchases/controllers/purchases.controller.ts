import {Controller} from '@nestjs/common';
import CrudResource from '../../core/resources/crud-resource';
import Purchase from '../entities/purchase.entity';
import PurchasesService from '../services/purchases.service';

@Controller('purchases')
export default class PurchasesController extends CrudResource<Purchase, PurchasesService> {
  constructor(readonly service: PurchasesService) {
    super(service);
  }
}
