import {
  UnauthorizedException,
  createParamDecorator,
  type ExecutionContext,
} from '@nestjs/common';
import { AuthenticatedRequest } from '../../auth/interfaces/authenticated-request.interface';
import { RequestUser } from '../../auth/auth.types';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): RequestUser => {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    if (request.user === undefined) {
      throw new UnauthorizedException('Authenticated user context is missing.');
    }

    return request.user;
  },
);
