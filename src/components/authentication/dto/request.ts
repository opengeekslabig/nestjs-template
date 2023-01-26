import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AbstractUserRequest {
  @ApiProperty({ required: true, format: 'string', example: 'email@gmail.com' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ required: true, format: 'string', example: 'test' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RegistrationRequest extends AbstractUserRequest {}
