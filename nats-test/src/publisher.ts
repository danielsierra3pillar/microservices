import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear();

const client = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

// @ts-ignore
client.on('connect', () => {
  console.log('Publisher connected to NATS');

  const publisher = new TicketCreatedPublisher(client);
  publisher.publish({
    id: '123',
    title: 'Concert',
    price: 20,
  });
  // const data = JSON.stringify({
  //   id: '123',
  //   title: 'Concert',
  //   price: 20,
  // });

  // name of the event
  // data as string
  // callback function
  // client.publish('ticket:created', data, () => {
  //   console.log('Event published');
  // });
});
