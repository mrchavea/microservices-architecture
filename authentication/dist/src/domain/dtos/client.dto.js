"use strict";
// const clientValidator = require("./client.schema");
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientDto = void 0;
// const makeClient = new Client(clientValidator);
// module.exports = makeClient;
class ClientDto {
    constructor(name, plan_id, subscription_id) {
    }
    static makeClient(object) {
        const { name, plan_id, subscription_id } = object;
        // if(name.length < 5) return ['Nombre muy corto', undefined]
        // const isValid: boolean = clientValidator(object)
        // if(!isValid) return [clientValidator.errors[0], undefined];
        return [undefined, new ClientDto(name, plan_id, subscription_id)];
    }
}
exports.ClientDto = ClientDto;
