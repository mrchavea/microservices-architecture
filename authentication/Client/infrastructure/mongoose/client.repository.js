const clientModel = require("../../../database/mongoose/models/client");

export class ClientRepositoryMongoose {
  async addClient(client) {
    return clientModel.create({
      name: client.name,
      plan_id: client.plan_id,
      subscription_id: client.subscription_id,
      isActive: client.isActive
    });
  }
}
