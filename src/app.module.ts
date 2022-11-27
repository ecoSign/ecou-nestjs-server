import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { AllExceptionsFilter } from './exceptions/all-exceptions.filter';
import { PostsModule } from './posts/posts.module';
import { EmailModule } from './email/email.module';
import emailConfig from './config/emailConfig';
import { validationSchema } from './config/validationSchema';
import { RedisCacheModule } from './middlewares/redis-cache.module';
import { PostReviewsModule } from './post-reviews/post-reviews.module';
import ormConfig from './ormConfig';
import authConfig from './config/authConfig';

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
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
    // { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})

// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    // consumer.apply(cors(), helmet(), LoggerMiddleware).forRoutes('*');
  }
}
