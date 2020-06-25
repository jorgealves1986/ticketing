import { Publisher, OrderCreatedEvent, Subjects } from '@jatickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
