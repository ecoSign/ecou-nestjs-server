import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import * as dotenv from 'dotenv';
dotenv.config();

const cacheModule = CacheModule.register({
  useFactory: () => ({
    isGlobal: true,
    store: redisStore,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    ttl: 0, // 캐시 만료 비활성화, default=5
  }),
});

@Module({
  imports: [cacheModule],
  exports: [cacheModule],
})
export class RedisCacheModule {}
