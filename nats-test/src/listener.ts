import { randomBytes } from 'crypto';
import nats, { Message } from 'node-nats-streaming';

console.clear();
const client = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

// @ts-ignore
client.on('connect', () => {
  console.log('Listener connected to NATS');

  // Notify NATS manually that a msessage has been recieved
  const options = client.subscriptionOptions().setManualAckMode(true);

  const subscription = client.subscribe(
    'ticket:created',
    'orders-service-queue-group',
    options
  );
  // @ts-ignore
  subscription.on('message', (message: Message) => {
    console.log('Message recieved');

    const data = message.getData();

    if (typeof data === 'string') {
      console.log(`Received event #${message.getSequence()}`);
      console.log(`Received data #${data}`);
    }

    // This is to tell node streaming library to reach back out the NATS
    // and tell hey! the message we recieved it has been processesd
    message.ack();
  });
});
