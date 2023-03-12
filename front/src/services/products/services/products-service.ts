import CrudService from '../../core/crud-service';
import ProductDto from '../dto/product-dto';

class ProductsService extends CrudService<ProductDto> {
  constructor() {
    super('products/');
  }
}

export default ProductsService;
