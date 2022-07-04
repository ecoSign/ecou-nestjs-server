import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from './email/email.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { PostsModule } from './posts/posts.module';
import { AllExceptionsFilter } from './exceptions/all-exceptions.filter';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.production.env'
          : process.env.NODE_ENV === 'stage'
          ? '.stage.env'
          : '.development.env',
      isGlobal: true, // 모든 모듈에서 env 사용가능하도록
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'ecosign',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
    }),
    UsersModule,
    PostsModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
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
