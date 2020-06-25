import { Publisher, Subjects, OrderCancelledEvent } from '@jatickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
