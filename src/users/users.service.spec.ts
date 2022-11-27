import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserInfo } from './UserInfo';

class UsersRepository extends Repository<UserEntity> {}

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UsersRepository],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserInfo', () => {
    it('should call repository', async () => {
      const user: UserEntity = {
        id: '01GJESSZ8ZD0DQJ4WRZ8EXNVVB',
        nickname: 'luke',
        email: 'temp7045@gmail.com',
        password: 'QWe123!@',
        createdAt: new Date('2022-11-21T19:33:42.196Z'),
        updatedAt: new Date('2022-11-21T19:33:42.196Z'),
        deletedAt: null,
        signupVerifyToken: 'd7e0a3e0-6a1e-11ed-a896-51fd38b63f50',
        Posts: [],
      };
      const spy = jest.spyOn(repository, 'findOne').mockResolvedValue(user);
      expect(await service.getUserInfo('temp7045@gmail.com')).toStrictEqual(
        user,
      );
      expect(spy).toBeCalledWith('temp7045@gmail.com');
    });
  });
});
