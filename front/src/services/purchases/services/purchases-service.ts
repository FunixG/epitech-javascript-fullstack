import CrudService from '../../core/crud-service';
import PurchaseDto from '../dto/purchase-dto';

class PurchasesService extends CrudService<PurchaseDto> {
  constructor() {
    super('purchases/');
  }

  async payment(productid: number): Promise<PurchaseDto | undefined> {
    return super.postCustomPath<PurchaseDto>(`payment?product-id=${productid}`, new PurchaseDto());
  }
}

export default PurchasesService;
