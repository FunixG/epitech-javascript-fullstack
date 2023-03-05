import {BeforeInsert, BeforeUpdate, Column, PrimaryGeneratedColumn,} from 'typeorm';

export default abstract class ApiEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ name: 'created_at', nullable: false })
    createdAt: Date;

  @Column({ name: 'updated_at', nullable: true })
    updatedAt: Date;

  @BeforeInsert()
  updateDates() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  updateModifiedDate() {
    this.updatedAt = new Date();
  }
}
