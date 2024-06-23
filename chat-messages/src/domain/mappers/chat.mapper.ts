import { Chat, CustomError } from ".."
import { AjvValidator } from "../../helpers"

export class ChatMapper {

    static async createChatFromObject(object:{[key:string]:any}):Promise<Chat>{
        const {id, messages, name, users} = object
        const validationErrors = await AjvValidator.getInstance().validate("chat", object)
        if(validationErrors.length > 0) throw CustomError.internalServer(validationErrors[0])
        return new Chat(id, name, users, messages)
    }
}