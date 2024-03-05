const makeClient = require("../domain");
export class ClientService {
  #clientRepository;

  constructor(clientRepository) {
    this.#clientRepository = clientRepository;
  }

  async addClient(name, plan_id, subscription_id) {
    const client = new makeClient(name, plan_id, subscription_id);
    return await this.#clientRepository.addClient(client);
  }
}
