import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from '../../typeorm_entity_defs/product.entity';

@ObjectType()
export class ProductPage {
  @Field()
  totalRows: number;

  @Field(() => [Product])
  nodes: Product[];
}
