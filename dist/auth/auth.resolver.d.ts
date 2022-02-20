import { User } from 'src/typeorm_entity_defs/user.entity';
import { AuthService } from './auth.service';
import { CreateUserInput } from './dto/input/create-user.input';
import { LoginResponse } from 'src/auth/models/login-response.model';
export declare class AuthResolver {
    private userService;
    constructor(userService: AuthService);
    createUser(createUserInput: CreateUserInput): Promise<User>;
    loginUser(email: string, password: string): Promise<LoginResponse>;
}
