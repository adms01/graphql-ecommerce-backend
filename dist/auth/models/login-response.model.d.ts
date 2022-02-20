import { User } from 'src/typeorm_entity_defs/user.entity';
export declare class LoginResponse {
    accessToken: string;
    user: User;
}
