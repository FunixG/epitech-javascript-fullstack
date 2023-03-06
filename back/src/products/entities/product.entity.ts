import {Column, Entity} from 'typeorm';
import ApiEntity from '../../core/entities/api-entity';

@Entity('products')
export default class Product extends ApiEntity {
  @Column({ length: 100, nullable: false })
    name: string;

  @Column({ length: 1000, nullable: false, name: 'url_picture' })
    urlPicture: string;

  @Column({ length: 10000, nullable: false })
    description: string;

  @Column({ type: 'double precision', nullable: false })
    price: number;

  @Column({ length: 300, nullable: false })
    category: string;
}
