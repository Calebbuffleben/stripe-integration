import {
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Logger,
  Body,
} from '@nestjs/common';

import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  private readonly logger = new Logger(StripeController.name);

  constructor(private readonly stripeService: StripeService) {}

  @Post('create-payments-intent')
  async createPaymentIntent(
    @Body()
    createPaymentIntentDto: {
      amount: number;
      currency: string;
    },
  ) {
    try {
      const { amount, currency } = createPaymentIntentDto;

      return await this.stripeService.createPaymentIntent(amount, currency);
    } catch (error) {
      this.logger.error('Failed to fetch products', error.stack);

      throw new HttpException(
        'Failed to fetch products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
