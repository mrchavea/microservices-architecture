import { CustomError, Token } from "../../domain";

export class TokenMapper {

    static async tokenFromObject (object:{[key:string]:any}): Promise<Token> {
        const {user_id, value, type, method, expiry_time} = object;
        console.log("Mapper token", user_id, value, type, method, expiry_time)
        if ( !user_id ) throw CustomError.badRequest('Missing user_id');
        if ( !value ) throw CustomError.badRequest('Missing value');
        if ( type == undefined ) throw CustomError.badRequest('Missing type');
        if ( method == undefined ) throw CustomError.badRequest('Missing method');
        if ( !expiry_time ) throw CustomError.badRequest('Missing expiry_time');

        return new Token(value, user_id, type, method, expiry_time)
    }
}