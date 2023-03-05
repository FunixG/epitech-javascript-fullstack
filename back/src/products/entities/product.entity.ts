import {Column, Entity} from 'typeorm';
import ApiEntity from '../../core/entities/api-entity';

@Entity('products')
export default class Product extends ApiEntity {
  @Column({ length: 100 })
    name: string;

  @Column({ length: 1000 })
    urlPicture: string;

  @Column({ length: 10000 })
    description: string;

  @Column({ type: 'double precision' })
    price: number;

  @Column({ length: 300 })
    category: string;
}
