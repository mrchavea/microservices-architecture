"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, client_id, name, email, username, password) {
        this.id = id;
        this.client_id = client_id;
        this.name = name;
        this.email = email;
        this.username = username;
        this.password = password;
    }
}
exports.User = User;
