import { Client } from "../entities/ client.entity";
import { ClientDto } from "../dtos/client.dto";

export abstract class ClientRepository{

    abstract register(clientDto: ClientDto): Promise<Client>
}