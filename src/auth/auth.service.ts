import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm_entity_defs/user.entity';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcryptjs';
import { CreateUserInput } from './dto/input/create-user.input';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async hashPw(password: string): Promise<string> {
    return await hash(password, 12);
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const hashedPw = await this.hashPw(createUserInput.password);

    const newUser: User = new User();
    newUser.firstName = createUserInput.firstName;
    newUser.lastName = createUserInput.lastName;
    newUser.email = createUserInput.email;
    newUser.password = hashedPw;
    return await this.save(newUser);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('We cannot find an account with that e-mail address', HttpStatus.NOT_FOUND);
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new HttpException('Your password is incorrect', HttpStatus.FORBIDDEN);
    }

    const payload = { id: user.id, email: user.email };

    const token = jwt.sign(
      {
        ...payload,
      },
      process.env.LOGIN_PRIVATE_KEY,
      { expiresIn: '2h' },
    );

    return {
      accessToken: `Bearer ${token}`,
      user: user,
    };
  }
}
