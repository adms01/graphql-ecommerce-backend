import { Field, Float, InputType } from '@nestjs/graphql';
import { Length, MaxLength, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsNotEmpty()
  @MaxLength(30)
  name: string;

  @Field()
  @Length(20, 255)
  description: string;

  @Field(() => Float)
  @IsNotEmpty()
  price: number;

  @Field(() => [String])
  @IsNotEmpty()
  images: string[];
}
