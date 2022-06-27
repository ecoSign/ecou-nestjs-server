import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Res,
  Scope,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { VerifyEmailDto } from './dto/verify-email.dto';
// import { UserInfo } from 'os';

// Scope.REQUEST, Scope.TRANSIENT
// @Controller('v1/users')
@Controller({ path: 'v1/users', scope: Scope.DEFAULT })
@ApiTags('유저 API')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  // @UseFilters(new HttpExceptionFilter())
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    const { nickname, email, password } = dto;
    console.log(dto);

    await this.usersService.createUser(nickname, email, password);
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    const { signupVerifyToken } = dto;
    console.log(dto);
    return await this.usersService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(email: string, password: string): Promise<string> {
    // TODO
    // 1. email, password를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
    // 2. JWT를 발급

    throw new Error('Method not implemented.');
  }

  @Get()
  findAll(@Res() res) {
    // const users = this.usersService.findAll()
    // return res.status(200).send(users)
    // return this.usersService.findAll();
  }

  @Get(':id')
  async getUserInfo(@Param('id') userId: string): Promise<void> {
    if (+userId < 1) {
      throw new BadRequestException('id는 0보다 큰 값이어야 합니다.');
    }
    return await this.usersService.getUserInfo(userId);
  }

  @HttpCode(202) // Accepted는 요청이 성공적으로 접수되었으나, 아직 해당 요청에 대해 처리 중이거나 처리 시작 전임을 의미합니다. 요청이 처리 중 실패할 수도 있기 때문에 요청은 실행될 수도 실행되지 않을수도 있습니다. 이 상태 코드는 비확약적, 즉 HTTP가 나중에 요청 처리 결과를 나타내는 비동기 응답을 보낼 방법이 없다는 것을 의미합니다. 이는 다른 프로세스나 서버가 요청을 처리하는 경우 또는 일괄 처리를 위한 것
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
