import { randomBytes } from 'crypto';
import { listenerCount } from 'events';
import nats, { Message, Stan } from 'node-nats-streaming';
import Listener from './events/base-listener';
import { TicketCreatedListener } from './events/ticket-created-listener';

console.clear();
const client = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

// @ts-ignore
client.on('connect', () => {
  console.log('Listener connected to NATS');

  client.on('close', () => {
    console.log('NATS connection closed!!');
    process.exit();
  });

  new TicketCreatedListener(client).listen();

  // all this stuff its manual!
  // // Notify NATS manually that a msessage has been recieved
  // const options = client
  //   .subscriptionOptions()
  //   .setManualAckMode(true)
  //   .setDeliverAllAvailable()
  //   // This option allow us to get all the past messages we
  //   // didnt recieved only 1 time, the name has to be the same
  //   // always to get this
  //   .setDurableName('accounting-service');

  // const subscription = client.subscribe(
  //   'ticket:created',
  //   'queue-group-name',
  //   options
  // );

  // @ts-ignore
  // subscription.on('message', (message: Message) => {
  //   console.log('Message recieved');

  //   const data = message.getData();

  //   if (typeof data === 'string') {
  //     console.log(`Received event #${message.getSequence()}`);
  //     console.log(`Received data #${data}`);
  //   }

  //   // This is to tell node streaming library to reach back out the NATS
  //   // and tell hey! the message we recieved it has been processesd
  //   message.ack();
  // });
});

// interrupt or terminate request from terminal
// close client
process.on('SIGINT', () => client.close());
process.on('SIGTERM', () => client.close());
