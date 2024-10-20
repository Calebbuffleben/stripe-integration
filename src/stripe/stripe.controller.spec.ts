import { Test, TestingModule } from '@nestjs/testing';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import Stripe from 'stripe';

jest.mock('stripe');

describe('StripeService', () => {
  let controller: StripeController; // This will hold our controller instance
  let stripeService: jest.Mocked<StripeService>; // Mocked StripeService instance

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StripeController],
      providers: [
        {
          provide: StripeService,
          useValue: {
            createPaymentIntent: jest.fn(), // Mock the createPaymentIntent method
            retrievePaymentIntent: jest.fn(), // Mock the retrievePaymentIntent method
          },
        },
      ],
    }).compile();

    // Get the controller instance from the testing module
    controller = module.get<StripeController>(StripeController);
    // Get the mocked StripeService instance from the testing module
    stripeService = module.get<StripeService>(
      StripeService,
    ) as jest.Mocked<StripeService>;
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call createPaymentIntent on StripeService', async () => {
    const mockPaymentIntent: Partial<Stripe.PaymentIntent> = {
      id: 'pi_123',
      amount: 5000,
      currency: 'usd',
      status: 'succeeded',
    };

    const result = await controller.createPaymentIntent({
      amount: 5000,
      currency: 'usd',
    });

    expect(stripeService.createPaymentIntent).toHaveBeenCalledWith(5000, 'usd');
    expect(result).toEqual(mockPaymentIntent);
  });
});
