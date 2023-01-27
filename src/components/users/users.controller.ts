import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { USER_TAG } from '@docs/tags';
import { USER_PATH } from '@docs/path';
import { UsersService } from '@components/users/users.service';
import { AuthJWT } from '@decorators/auth-jwt.decorator';
import { IUserResponse } from '@components/users/interfaces/user.interfaces';
import { ParamId } from '@components/base/dto/request';
import { UserUpdateRequest } from '@components/users/dto/request';

@ApiTags(USER_TAG)
@Controller(USER_PATH)
@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @AuthJWT()
  @Get()
  getUsers(): Promise<IUserResponse[]> {
    return this.userService.getUsers();
  }

  @AuthJWT()
  @Get(':id')
  getUser(@Param() param: ParamId): Promise<IUserResponse> {
    return this.userService.getUserById(param.id);
  }

  @AuthJWT()
  @Delete(':id')
  deleteUser(@Param() param: ParamId) {
    return this.userService.deleteUser(param.id);
  }

  @AuthJWT()
  @Put(':id')
  updateUser(@Param() param: ParamId, @Body() body: UserUpdateRequest) {
    return this.userService.updateUser(body, param.id);
  }

  @AuthJWT()
  @Get('/orders/:id')
  userOrders(@Param() param: ParamId) {
    return this.userService.getUserOrders(param.id);
  }
}
