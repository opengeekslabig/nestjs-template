import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthenticationService } from '@components/authentication/authentication.service';
import {
  AbstractUserRequest,
  RegistrationRequest,
} from '@components/authentication/dto/request';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateUserResponse,
  LoginResponse,
  RefreshToken,
} from '@components/users/dto/response';
import { LocalAuthenticationGuard } from '@components/authentication/guards/local-authentication.guard';
import { Req } from '@nestjs/common';
import { RequestWithUser } from '@components/authentication/dto/request-with-user.interface';
import { AUTH_TAG } from '@docs/tags';
import { AUTH_PATH } from '@docs/path';
import { JwtRefreshGuard } from '@components/authentication/guards/jwt-authentication-refresh.guard';
import { IUserResponse } from '@components/users/interfaces/user.interfaces';

@ApiTags(AUTH_TAG)
@Controller(AUTH_PATH)
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @ApiCreatedResponse({ type: CreateUserResponse })
  @Post('create')
  async register(
    @Body() registrationData: RegistrationRequest,
  ): Promise<IUserResponse> {
    return this.authenticationService.register(registrationData);
  }

  @Post('login')
  @ApiCreatedResponse({ type: LoginResponse })
  @ApiBody({ type: AbstractUserRequest })
  @UseGuards(LocalAuthenticationGuard)
  async login(@Req() request: RequestWithUser) {
    const { user } = request;
    return this.authenticationService.getJwtAccessToken(user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @ApiOkResponse({ type: RefreshToken })
  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  async refresh(@Req() request: RequestWithUser) {
    const { user } = request;

    const { accessToken, refreshToken } =
      await this.authenticationService.getJwtAccessToken(user);
    return { accessToken, refreshToken };
  }
}
