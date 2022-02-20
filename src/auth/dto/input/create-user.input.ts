import { Field, InputType } from '@nestjs/graphql';
import { Length, MaxLength, IsNotEmpty, IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @MaxLength(30)
  firstName: string;

  @Field()
  @IsNotEmpty()
  @Length(1, 255)
  lastName: string;

  @Field()
  @IsNotEmpty()
  @Length(5, 255)
  password: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
