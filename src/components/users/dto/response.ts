import { ApiProperty } from '@nestjs/swagger';

export class RefreshToken {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

export class CreateUserResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  login: string;
}

export class LoginResponse extends CreateUserResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
