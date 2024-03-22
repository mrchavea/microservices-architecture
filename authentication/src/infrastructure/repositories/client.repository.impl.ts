import { Client, ClientDatasource, ClientDto, ClientRepository } from "../../domain";

export class ClientRepositoryImpl implements ClientRepository{

    constructor(private clientDatasource: ClientDatasource){}

    register(clientDto: ClientDto): Promise<Client> {
        return this.clientDatasource.register(clientDto)
    }

}