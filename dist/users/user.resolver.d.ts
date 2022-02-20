import { User } from 'src/typeorm_entity_defs/user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/input/create-user.input';
import { LoginResponse } from 'src/users/models/login-response.model';
export declare class UserResolver {
    private userService;
    constructor(userService: UserService);
    createUser(createUserInput: CreateUserInput): Promise<User>;
    loginUser(email: string, password: string): Promise<LoginResponse>;
}
