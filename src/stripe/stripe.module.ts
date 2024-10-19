import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule], // Import ConfigModule to use environment variables
  providers: [StripeService],
  controllers: [StripeController],
  exports: [StripeService], // Export service if needed in other modules
})
export class StripeModule {}
