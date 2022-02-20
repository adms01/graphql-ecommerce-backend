import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

/**
 * //*Database Model for product table
 */

@Entity({ name: 'product' })
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID, { nullable: true })
  id: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'varchar', length: 30 })
  @Field()
  name: string;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  description: string;

  @Column({ type: 'numeric' })
  @Field(() => Float)
  price: number;

  @Column({ type: 'text' })
  @Field()
  images: string;

  constructor(name?: string, description?: string, price?: number, images?: string) {
    this.name = name || '';
    this.description = description || '';
    this.price = price || NaN;
    this.images = images || '';
  }
}
