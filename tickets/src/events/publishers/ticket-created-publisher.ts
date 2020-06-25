import { Publisher, Subjects, TicketCreatedEvent } from '@jatickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
