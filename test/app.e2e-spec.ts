import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import * as request from 'supertest';
import { DatabaseService } from '../src/database/database.service';
import { AppModule } from '../src/app.module';

describe('UsersController', () => {
  let dbConnection: Connection;
  let httpServer: any;
  let app: any;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    dbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    // await dbConnection.collection('users').deleteMany({});
  });

  describe('Get vaccine doses', () => {
    it('Success with valid params', async () => {
      const query = {
        c: 'AT',
        dateFrom: '2021-W45',
        dateTo: '2021-W53',
        rangeSize: 2,
        sort: 'NumberDosesReceived',
      };

      const response = await request(httpServer)
        .get('/vaccine-summary')
        .query(query);

      expect(response.status).toBe(200);
      // expect(response.body).toMatchObject([userStub()]);
    });
  });
});
