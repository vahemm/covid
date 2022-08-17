import { Module, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { VaccineTrackerModule } from './vaccine_tracker/vaccine_tracker.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/covid'),
    UsersModule,
    VaccineTrackerModule,
    ThrottlerModule.forRoot({
      ttl: 60, //jamanak@ varkyannerov
      limit: 5, //zaprosneri qanak
    }),
  ],
  controllers: [],
  providers: [
    // { provide: APP_FILTER, useClass: GlobalValidationExceptionFilter },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        validationError: {
          value: true,
        },
      }),
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
