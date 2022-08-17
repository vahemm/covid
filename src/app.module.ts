import { Module, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { VaccineTrackerModule } from './vaccine_tracker/vaccine_tracker.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { CustomThrottlerGuard } from './vaccine_tracker/results/rateLimitError.result';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    VaccineTrackerModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 5,
    }),
  ],
  controllers: [],
  providers: [
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
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class AppModule {}
