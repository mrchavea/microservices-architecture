export class Token {
  
  value: string;
  expiry_time: Date | undefined;
  user_id: string;
  type: 'REFRESH_TOKEN' | 'LOGIN';

  constructor(value:string, user_id:string, type: 'REFRESH_TOKEN' | 'LOGIN',  expiry_time?:Date) {
    this.value = value;
    this.expiry_time = expiry_time;
    this.user_id = user_id;
    this.type = type;
  }
}
