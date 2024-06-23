import { Message, User } from "..";
import { AjvValidator } from "../../helpers";

export class NewChatDto {
    name:string;
    slug:string;
    users:Array<User>;
    messages?:Array<Message>;

    private constructor(name:string, slug:string, users: Array<User>, messages?:Array<Message> ){
        this.name = name;
        this.slug = slug;
        this.users = users
        this.messages = messages
    }

    static async makeChat( object: {[key: string]: any}) : Promise<[string?, NewChatDto?]>{
        const {name, slug, users, messages} = object
            const validationErrors = await AjvValidator.getInstance().validate("chat", object)
            console.log("VALIDATION ERR?", validationErrors)
            if(validationErrors.length > 0) {
                return [validationErrors[0], undefined];
            }
            return [undefined, new NewChatDto(name, slug, users, messages)]
    }

}