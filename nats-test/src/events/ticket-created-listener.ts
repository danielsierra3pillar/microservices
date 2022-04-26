import { Message } from 'node-nats-streaming';
import Listener from './base-listener';
import { Subjects } from './subject';
import { TicketCreatedEvent } from './ticket-created-event';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  // to call a variable as final
  readonly subject = Subjects.TicketCreated;
  queueGroupName = 'payments-service';

  onMessage(data: TicketCreatedEvent['data'], message: Message) {
    console.log('Event data!', data);

    message.ack();
  }
}
