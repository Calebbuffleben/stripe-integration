import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [ConfigModule.forRoot(), StripeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
