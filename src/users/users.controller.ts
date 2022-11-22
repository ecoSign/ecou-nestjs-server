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
  Scope,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UserInfo } from './UserInfo';
import { ValidationPipe } from '../validation.pipe';
import { UserEntity } from './entities/user.entity';

// Scope.REQUEST, Scope.TRANSIENT
@ApiTags('유저 API')
@Controller({ path: 'v1/users', scope: Scope.DEFAULT })
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @UseFilters(new HttpExceptionFilter())
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    const { nickname, email, password } = createUserDto;

    // await this.usersService.createUser(createUserDto);
    await this.usersService.createUser(nickname, email, password);
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    const { signupVerifyToken } = dto;
    return await this.usersService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(email: string, password: string): Promise<UserInfo> {
    return await this.usersService.login(email, password);
  }

  @Get()
  // findAll(@Res() res: Response) {
  findAll(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ValidationPipe) id: string): Promise<UserInfo> {
    return this.usersService.findOne(id);
  }

  @HttpCode(202) // Accepted는 요청이 성공적으로 접수되었으나, 아직 해당 요청에 대해 처리 중이거나 처리 시작 전임을 의미합니다. 요청이 처리 중 실패할 수도 있기 때문에 요청은 실행될 수도 실행되지 않을수도 있습니다. 이 상태 코드는 비확약적, 즉 HTTP가 나중에 요청 처리 결과를 나타내는 비동기 응답을 보낼 방법이 없다는 것을 의미합니다. 이는 다른 프로세스나 서버가 요청을 처리하는 경우 또는 일괄 처리를 위한 것
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserInfo> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    // remove(@Param() params: {[key: string]: string}) {
    return this.usersService.remove(id);
  }
}
