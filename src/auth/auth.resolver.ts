import { User } from 'src/typeorm_entity_defs/user.entity';
import { AuthService } from './auth.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/input/create-user.input';
import { LoginResponse } from 'src/auth/models/login-response.model';

@Resolver(() => User)
export class AuthResolver {
  constructor(private userService: AuthService) {}

  /**
   * //*Sign up user
   */
  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return await this.userService.createUser(createUserInput);
  }

  /**
   * //*Login
   */
  @Mutation(() => LoginResponse)
  async loginUser(@Args('email') email: string, @Args('password') password: string): Promise<LoginResponse> {
    return await this.userService.login(email, password);
  }
}
