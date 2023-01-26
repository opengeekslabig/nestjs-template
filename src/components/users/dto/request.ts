import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UserUpdateRequest {
  @ApiProperty()
  @IsString()
  @IsOptional()
  login: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password: string;
}
