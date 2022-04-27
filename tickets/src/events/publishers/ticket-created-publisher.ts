import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from '@danielsierra3pillartickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
