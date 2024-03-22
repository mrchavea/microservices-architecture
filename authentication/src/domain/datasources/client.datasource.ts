import { Client } from "../entities/ client.entity";
import { ClientDto } from "../dtos/client.dto";

export abstract class ClientDatasource{

    abstract register(clientDto: ClientDto): Promise<Client>
}