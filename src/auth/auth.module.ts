import { Module } from '@nestjs/common';
import { User } from 'src/typeorm_entity_defs/user.entity';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm/';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
