import { AjvValidator } from "../../helpers";
import { CustomError } from "../entities/error.entity";

export class RegisterUserDto {    
    name:string;
    username:string;
    email:string;
    password:string;
    client_id:string;

    private constructor(name:string, username:string, email:string, password: string, client_id:string){
        this.name = name;
        this.username = username;
        this.email = email
        this.password = password
        this.client_id = client_id
    }

    static async makeUser( object: {[key: string]: any}) : Promise<[string?, RegisterUserDto?]>{
        const {name, username, email, password, client_id} = object
            const validationErrors = AjvValidator.getInstance().validate("user", object)
            if(validationErrors.length > 0) {
                return [validationErrors[0], undefined];
            }
            return [undefined, new RegisterUserDto(name, username, email, password, client_id)]
    }
}
