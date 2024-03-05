import { ClientService } from "../../application/client.service";
import { ClientRepositoryMongoose } from "../mongoose/client.repository";

export class ClientController {
  #clientService = ClientService;

  constructor() {
    var clientRepository = new ClientRepositoryMongoose();
    this.#clientService = new ClientService(clientRepository);
  }
}
