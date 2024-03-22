"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
class Client {
    constructor(id, name, plan_id, subscription_id) {
        this.name = name;
        this.plan_id = plan_id;
        this.subscription_id = subscription_id;
        this.isActive = false;
    }
}
exports.Client = Client;
