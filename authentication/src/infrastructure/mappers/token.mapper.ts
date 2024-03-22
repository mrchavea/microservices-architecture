import { CustomError, Token, User } from "../../domain";
import { AjvValidator } from "../../helpers";

export class TokenMapper {

    static async tokenFromObject (object:{[key:string]:any}): Promise<Token> {
        const {value, user_id, expiry_time, type} = object;
        const validationErrors = AjvValidator.getInstance().validate("token", object)
        if(validationErrors.length > 0){
            throw CustomError.internalServer("Database entity error: " + validationErrors[0])
        }

        return new Token(value, user_id, type, expiry_time)
    }
}