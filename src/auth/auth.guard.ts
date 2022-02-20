import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { validateToken } from './validateToken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();

    if (!ctx.req.headers.authorization) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    ctx.user = await validateToken(ctx.req.headers.authorization);
    return true;
  }
}
