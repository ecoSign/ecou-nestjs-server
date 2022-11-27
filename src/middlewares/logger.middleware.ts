import {
  Inject,
  Injectable,
  Logger,
  LoggerService,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware<Request, Response> {
  constructor(@Inject(Logger) private readonly logger: LoggerService) {}
  // private logger = new Logger('HTTP');

  // 이 미들웨어는 라우터보다 더 먼저 실행됨
  use(request: Request, response: Response, next: NextFunction): void {
    // 요청 객체로부터 ip, http method, url, user agent를 받아온 후
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent');

    // 응답이 끝나는 이벤트가 발생하면 로그를 찍는다.
    response.on('finish', () => {
      const { statusCode } = response;
      // const contentLength = response.get('content-length');

      //   this.logger.log(
      this.logger.log(
        // `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`
        `${method} ${originalUrl} ${statusCode} - ${ip} ${userAgent}`,
      );
    });

    next();
  }
}
