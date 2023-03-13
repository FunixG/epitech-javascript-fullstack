import { Entity, ManyToOne } from 'typeorm';
import ApiEntity from '../../core/entities/api-entity';
import User from '../../user/entities/user.entity';
import Product from '../../products/entities/product.entity';

@Entity('purchases')
export default class Purchase extends ApiEntity {
  @ManyToOne(() => User, { nullable: false })
    user: User;

  @ManyToOne(() => Product, { nullable: false })
    product: Product;
}
