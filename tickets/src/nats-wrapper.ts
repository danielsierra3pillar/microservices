import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
  private _client?: Stan;

  // create an instance of nats and then assgin it to _client
  connect(cluster_id: string, client_id: string, url: string) {
    this._client = nats.connect(cluster_id, client_id, { url });

    return new Promise<void>((resolve, reject) => {
      this._client?.on('connect', () => {
        console.log('Connected to NATS!');
        resolve();
      });

      this._client?.on('connect', (error) => {
        console.log('Connected to NATS!');
        reject(error);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
