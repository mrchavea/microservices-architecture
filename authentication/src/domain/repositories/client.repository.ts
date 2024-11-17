import { Client } from "../../domain";
import { ClientDto } from "../dtos/client.dto";

export abstract class ClientRepository {
  abstract register(clientDto: ClientDto): Promise<Client>;
}
