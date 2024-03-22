
export class User {
  
  id:string;
  client_id: string;
  name: string;
  email: string;
  username: string;
  password: string;

  constructor(id:string, client_id:string, name: string, email: string, username: string, password: string) {
    this.id = id;
    this.client_id = client_id;
    this.name = name;
    this.email = email;
    this.username = username;
    this.password = password;
  }

}
