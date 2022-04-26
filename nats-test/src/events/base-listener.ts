import { Message, Stan } from 'node-nats-streaming';

abstract class Listener {
  abstract subject: string;
  abstract queueGroupName: string;
  abstract onMessage(data: any, mesagge: Message): void;
  private client: Stan;
  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return (
      this.client
        .subscriptionOptions()
        .setDeliverAllAvailable()
        .setManualAckMode(true)
        .setAckWait(this.ackWait)
        // This option allow us to get all the past messages we
        // didnt recieved only 1 time, the name has to be the same
        // always to get this
        .setDurableName(this.queueGroupName)
    );
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on('message', (message: Message) => {
      console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);

      const parsedData = this.parseMessage(message);

      this.onMessage(parsedData, message);
    });
  }

  parseMessage(message: Message) {
    const data = message.getData();

    return typeof data == 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf-8'));
  }
}

export default Listener;
