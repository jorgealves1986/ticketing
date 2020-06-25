import express, { Request, Response } from 'express';
import { param } from 'express-validator';
import mongoose from 'mongoose';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError
} from '@jatickets/common';
import { Order } from '../models/order';

const router = express.Router();

router.get(
  '/api/orders/:orderId',
  requireAuth,
  [
    param('orderId')
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('Invalid order id')
  ],
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate('ticket');

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    res.send(order);
  }
);

export { router as showOrderRouter };
