import { Message, CustomError } from "@/domain"
import { AjvValidator } from "../../helpers"

export class MessageMapper {

    static async createMessageFromObject(object:{[key:string]:any}):Promise<Message>{
        const {_id, id, chatId, text, sent_date, from} = object
        const validationErrors = await AjvValidator.getInstance().validate("message", object)
        if(validationErrors.length > 0) throw CustomError.internalServer(validationErrors[0])
        return new Message(_id || id, chatId, text, sent_date, from)
    }
}