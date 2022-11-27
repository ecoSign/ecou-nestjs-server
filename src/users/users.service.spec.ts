import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

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

  describe('getUser', () => {
    it('should call repository', async () => {
      const user = { id: '01GJESSZ8ZD0DQJ4WRZ8EXNVVB', nickname: 'luke' };
      const spy = jest.spyOn(repository, 'findOne').mockResolvedValue(user);
      expect(await service.findOne('01GJESSZ8ZD0DQJ4WRZ8EXNVVB')).toStrictEqual(
        user,
      );
      expect(spy).toBeCalledWith(1);
    });
  });
});
