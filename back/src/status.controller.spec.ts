import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import AppModule from './app.module';

describe('StatusController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    process.env.NODE_ENV = 'test'; // set environment to test

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => request(app.getHttpServer())
    .get('/')
    .expect(200)
    .expect({
      status: true,
    }));
});
