import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent
} from '@jatickets/common';

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  readonly subject = Subjects.ExpirationComplete;
}
