
export class Client {
  
  name: string;
  plan_id: string;
  subscription_id: string;
  isActive: boolean

  constructor(id:string, name: string, plan_id: string, subscription_id: string) {
    this.name = name;
    this.plan_id = plan_id;
    this.subscription_id = subscription_id;
    this.isActive = false;
  }

  // validateData() {
  //   const isValid = this.clientValidator({
  //     name: this.name,
  //     plan_id: this.plan_id,
  //     subscription_id: this.subscription_id,
  //     isActive: this.isActive
  //   });
  //   if (!isValid) throw new Error("Cannot create a client, check the data");
  // }
}
