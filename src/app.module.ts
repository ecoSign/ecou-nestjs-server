import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import emailConfig from './config/emailConfig';
import { validationSchema } from './config/validationSchema';
import { RedisCacheModule } from './middlewares/redis-cache.module';
import { PostReviewsModule } from './post-reviews/post-reviews.module';
import ormConfig from './ormConfig';
import authConfig from './config/authConfig';
import { ExceptionModule } from './exception/exception.module';
import { BatchModule } from './batch/batch.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      // envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [emailConfig, authConfig],
      isGlobal: true, // 모든 모듈에서 env 사용가능하도록
      validationSchema,
      // process.env.NODE_ENV === 'production'
      //   ? '.production.env'
      //   : process.env.NODE_ENV === 'stage'
      //   ? '.stage.env'
      //   : '.development.env',
    }),
    RedisCacheModule,
    TypeOrmModule.forRoot(ormConfig),
    UsersModule,
    PostsModule,
    PostReviewsModule,
    ExceptionModule,
    // BatchModule,
    // LoggingModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService, Logger],
})

// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    // consumer.apply(cors(), helmet(), LoggerMiddleware).forRoutes('*');
  }
}
