import { CustomError, User } from "../../domain";
import { AjvValidator } from "../../helpers";

export class UserMapper {

    static userFromObject (object:{[key:string]:any}): User {
        const {id, _id, client_id, name, email, username, password} = object;
        const validationErrors = AjvValidator.getInstance().validate("user", object)
        if(validationErrors.length > 0){
            throw CustomError.internalServer("Database entity error: " + validationErrors[0])
        }

        return new User(id || _id, client_id, name, email, username, password)
    }
}