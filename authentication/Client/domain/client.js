export class Client {
  // name;
  // plan_id = "default_plan";
  // subscription_id = "default_subscription";
  // isActive = false;

  constructor(clientValidator, name, plan_id, subscription_id) {
    this.clientValidator = clientValidator;
    this.name = name;
    this.plan_id = plan_id;
    this.subscription_id = subscription_id;
    this.isActive = false;
    this.validateData();
  }

  validateData() {
    const isValid = this.clientValidator({
      name: this.name,
      plan_id: this.plan_id,
      subscription_id: this.subscription_id,
      isActive: this.isActive
    });
    if (!isValid) throw new Error("Cannot create a client, check the data");
  }
}
