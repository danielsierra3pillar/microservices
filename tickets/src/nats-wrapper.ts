import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error('Cannot acces NATS client before connecting');
    }

    return this._client;
  }

  // create an instance of nats and then assgin it to _client
  connect(cluster_id: string, client_id: string, url: string) {
    this._client = nats.connect(cluster_id, client_id, { url });

    return new Promise<void>((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('Connected to NATS!');
        resolve();
      });

      this.client.on('error', (error) => {
        console.log('Error Connected to NATS!');
        reject(error);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
