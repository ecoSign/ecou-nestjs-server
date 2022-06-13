import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  HttpCode
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
// import { UserInfo } from 'os';

@Controller('v1/users')
@ApiTags('유저 API')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    const { nickname, email, password } = dto;    
    console.log(dto);
    
    await this.usersService.createUser(nickname, email, password);
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    const {signupVerifyToken} = dto;
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
    return await this.usersService.getUserInfo(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
