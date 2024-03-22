// const clientValidator = require("./client.schema");

// const makeClient = new Client(clientValidator);

// module.exports = makeClient;

export class ClientDto {    
    private constructor(name:string, plan_id:string, subscription_id: string){
    }

    static makeClient( object: {[key: string]: any}) : [string?, ClientDto?]{
        const {name, plan_id, subscription_id} = object
        // if(name.length < 5) return ['Nombre muy corto', undefined]
        // const isValid: boolean = clientValidator(object)
        // if(!isValid) return [clientValidator.errors[0], undefined];
        return [undefined, new ClientDto(name, plan_id, subscription_id)]
    }
}
