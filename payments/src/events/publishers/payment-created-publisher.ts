import { Subjects, Publisher, PaymentCreatedEvent } from '@jatickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
