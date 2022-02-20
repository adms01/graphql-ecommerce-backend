import { User } from 'src/typeorm_entity_defs/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/input/create-user.input';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    hashPw(password: string): Promise<string>;
    save(user: User): Promise<User>;
    createUser(createUserInput: CreateUserInput): Promise<User>;
    login(email: string, password: string): Promise<{
        accessToken: string;
        user: User;
    }>;
}
