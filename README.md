<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description
[ecosign-server](https://github.com/kimja7045/ecosign-server) repository with nestJs.

## Running the app
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Etc
```bash
아키텍처 구조
controller -> service -> repository -> entity(모델(=테이블))

Controller
url을 가져오고 function을 return, express의 라우터 역할, 요청과 응답에 대해서는 알아도되지만 모르게 설계하게 좋습니다 -> 결합성을 낮추기 위해

Service
실제로 function을 가지는 부분, 비즈니스(e.g. 영화) 로직을 관리하는 역할, 요청과 응답에 대해서 몰라야됩니다

Entity
데이터베이스에 저장되는 데이터의 형태를 보여주는 모델을 의미합니다.

Repository
Entity에 의해 생성된 DB에 접근하는 메서드 들을 사용하기 위한 인터페이스

Single-responsibility principle
하나의 module, class 혹은 function이 하나의 기능은
꼭 책임져야 한다

NestJS가 Service를 import하고 Controller에 inject - Dependency Injection

파이프 - 미들웨어, 유효성 검사

nest - 명령어 모음

nest g co controllerNames- 컨트롤러 생성
nest g s serviceNames- 서비스 생성
nest g mo moduleNames - 모듈 생성
nest g res resourceNames - dto, entities, controller, crud

npm i typeorm @nestjs/typeorm pg
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
