import {Column, Entity} from 'typeorm';
import ApiEntity from '../../core/entities/api-entity';

@Entity('users')
export default class User extends ApiEntity {
  @Column({ length: 255, nullable: false })
    username: string;

  @Column({ length: 500, nullable: false })
    password: string;

  @Column({ length: 50, nullable: false })
    email: string;

  @Column({ length: 250, nullable: false })
    address: string;

  @Column({ name: 'is_active' })
    isActive: boolean;
}
