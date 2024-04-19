import { CustomError, User } from "../../domain";

export class UserMapper {

    static async userFromObject (object:{[key:string]:any}): Promise<User> {
        const {id, _id, client_id, name, email, username, password} = object;
        console.log("Mapper", id, _id, client_id, name, email, username, password)
        
        if ( !_id || !id ) {
            throw CustomError.badRequest('Missing id');
          }
      
        if ( !name ) throw CustomError.badRequest('Missing name');
        if ( !email ) throw CustomError.badRequest('Missing email');
        if ( !password ) throw CustomError.badRequest('Missing password');
        if ( !username ) throw CustomError.badRequest('Missing username');

        return new User(id || _id, client_id.toString(), name, email, username, password)
    }
}