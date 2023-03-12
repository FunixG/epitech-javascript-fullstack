import CrudService from '../../core/crud-service';
import PurchaseDto from '../dto/purchase-dto';

class PurchasesService extends CrudService<PurchaseDto> {
  constructor() {
    super('purchases/');
  }
}

export default PurchasesService;
