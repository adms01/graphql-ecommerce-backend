import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/typeorm_entity_defs/user.entity';

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;

  @Field()
  user!: User;
}
