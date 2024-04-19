import { TOKEN_METHOD, TOKEN_TYPE } from "../../helpers/enums";

export class Token {
  
  value: string;
  expiry_time: Date;
  user_id: string;
  method: TOKEN_METHOD;
  type: TOKEN_TYPE

  constructor(value:string, user_id:string, type:TOKEN_TYPE, method: TOKEN_METHOD,  expiry_time:Date) {
    this.value = value;
    this.expiry_time = expiry_time;
    this.user_id = user_id;
    this.type = type;
    this.method = method;
  }
}
