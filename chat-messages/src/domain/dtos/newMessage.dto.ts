import { Message, User } from "..";
import { AjvValidator } from "../../helpers";

export class NewMessageDto {
    chatId: string;
    text:string;
    from:User;
    sent_date:Date;

    private constructor(chatId:string, text:string, from: User, sent_date:Date ){
        this.chatId = chatId;
        this.text = text;
        this.from = from
        this.sent_date = sent_date
    }

    static async makeChat( object: {[key: string]: any}) : Promise<[string?, NewMessageDto?]>{
        const {chatId, text, from, sent_date} = object
            const validationErrors = await AjvValidator.getInstance().validate("message", object)
            console.log("VALIDATION ERR?", validationErrors)
            if(validationErrors.length > 0) {
                return [validationErrors[0], undefined];
            }
            return [undefined, new NewMessageDto(chatId, text, from, sent_date)]
    }

}