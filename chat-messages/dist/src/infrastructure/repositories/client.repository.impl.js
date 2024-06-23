"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRepositoryImpl = void 0;
class ClientRepositoryImpl {
    constructor(clientDatasource) {
        this.clientDatasource = clientDatasource;
    }
    register(clientDto) {
        return this.clientDatasource.register(clientDto);
    }
}
exports.ClientRepositoryImpl = ClientRepositoryImpl;
