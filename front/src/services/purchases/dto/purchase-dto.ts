import ApiEntity from '../../core/entities/api-entity';
import UserDto from '../../user/dto/user-dto';
import ProductDto from '../../products/dto/product-dto';

class PurchaseDto extends ApiEntity {
  user?: UserDto;

  product?: ProductDto;
}

export default PurchaseDto;
