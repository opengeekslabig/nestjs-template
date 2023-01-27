import { applyDecorators, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { IAuthJWTGuardOptions } from '@decorators/auth-guard.options';
import { JwtAuthenticationGuard } from '@components/authentication/guards/jwt-authentication.guard';

export function AuthJWT(options?: IAuthJWTGuardOptions) {
  const opts = { applySwaggerGuard: true, ...options };
  const decorators = [
    UseGuards(JwtAuthenticationGuard),
    ApiForbiddenResponse({ description: 'Forbidden' }),
  ];

  if (opts.applySwaggerGuard) {
    decorators.push(
      ApiBearerAuth(),
      ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
  }

  return applyDecorators(...decorators);
}
