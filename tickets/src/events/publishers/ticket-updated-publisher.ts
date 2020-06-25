import { Publisher, Subjects, TicketUpdatedEvent } from '@jatickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
