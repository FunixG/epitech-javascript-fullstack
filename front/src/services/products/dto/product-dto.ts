import ApiEntity from '../../core/entities/api-entity';

class ProductDto extends ApiEntity {
  name?: string;

  urlPicture?: string;

  description?: string;

  price?: number;

  category?: string;
}

export default ProductDto;
