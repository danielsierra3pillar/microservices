import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from '@danielsierra3pillartickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
