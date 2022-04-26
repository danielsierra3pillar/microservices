import { Message } from 'node-nats-streaming';
import Listener from './base-listener';

export class TicketCreatedListener extends Listener {
  subject = 'ticket:created';
  queueGroupName = 'payments-service';

  onMessage(data: any, message: Message) {
    console.log('Event data!', data);

    message.ack();
  }
}
