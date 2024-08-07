export class Message {
    id: string;
    text: string;
    from: string;
    sent_date: Date;
    chatId:string

    constructor(id:string, text:string, from:string, sent_date:Date, chatId:string){
        this.id = id;
        this.chatId = chatId;
        this.text = text;
        this.from = from;
        this.sent_date = sent_date;
    }
}