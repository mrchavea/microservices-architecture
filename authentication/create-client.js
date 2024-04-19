const ClientModel = require("./dist/database/mongoose/models/client");

const data = {
  name: "Hello Auto",
  plan_id: "5f4c36e878fea7c504000002",
  subscription_id: "5f4c36e878fea7c504000002",
  isActive: true
};

(async () => {
  const client = await ClientModel.create(data);
  await client.save();
})();
