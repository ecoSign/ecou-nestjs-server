import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import * as uuid from 'uuid';
import { EmailService } from '../email/email.service';
import { UserInfo } from './UserInfo';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Connection, Repository } from 'typeorm';
import { ulid } from 'ulid';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './dto/user-login.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private emailService: EmailService,

    // private usersRepository: UsersRepository,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private connection: Connection,
    private authService: AuthService,
  ) {}

  async createUser(nickname: string, email: string, password: string) {
    const isUserExist = await this.checkUserExists(email);
    if (isUserExist) {
      throw new UnprocessableEntityException(
        '해당 이메일로는 가입할 수 없습니다.',
      );
    }

    const signupVerifyToken = uuid.v1();

    await this.saveUserUsingTransaction(
      nickname,
      email,
      password,
      signupVerifyToken,
    );
    await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  private async checkUserExists(emailAddress: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: {
        email: emailAddress,
      },
    });
    return user !== undefined;
  }

  private async saveUserUsingTransaction(
    nickname: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    await this.connection.transaction(async (manager) => {
      const user = new UserEntity();
      user.id = ulid();
      user.nickname = nickname;
      user.email = email;
      user.password = password;
      user.signupVerifyToken = signupVerifyToken;

      await manager.save(user);
    });
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }

  async verifyEmail(signupVerifyToken: string): Promise<string> {
    const user = await this.usersRepository.findOne({ signupVerifyToken });
    console.log('user', user);

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다');
    }

    // TODO
    // 2. 바로 로그인 상태가 되도록 JWT를 발급
    return this.authService.login({
      id: user.id,
      nickname: user.nickname,
      email: user.email,
    });
  }

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async getUserInfo(email: string): Promise<UserInfo> {
    const user = await this.usersRepository.findOne({ email });
    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }
    return {
      id: user.id,
      nickname: user.nickname,
      email: user.email,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserInfo> {
    const user = await this.usersRepository.findOne({ id });
    if (!user) throw new NotFoundException(`유저가 존재하지 않습니다.`);
    await this.usersRepository.save(user);
    return user;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async login(userLoginDto: UserLoginDto): Promise<string> {
    const { email, password } = userLoginDto;
    const user = await this.usersRepository.findOne({
      email,
      password,
    });

    if (!user) throw new NotFoundException(`유저가 존재하지 않습니다.`);

    return this.authService.login({
      id: user.id,
      nickname: user.nickname,
      email: user.email,
    });
  }
}
