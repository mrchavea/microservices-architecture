
import { AjvValidator, JwtAdapter, TOKEN_METHOD, TOKEN_TYPE, TokenPayload } from "../../helpers";
import { CustomError } from "../entities/error.entity";

export class TokenDto {    

    value: string;
    expiry_time: Date | undefined;
    user_id: string;
    type: TOKEN_TYPE;
    method: TOKEN_METHOD;
  
    private constructor(value:string, user_id:string, type:TOKEN_TYPE, method: TOKEN_METHOD, expiry_time?:Date) {
      this.value = value;
      this.expiry_time = expiry_time;
      this.user_id = user_id;
      this.type = type;
      this.method= method;
    }

    static async makeTokenDto( encoded_token: string, tokenType:TOKEN_TYPE) : Promise<[(string | undefined)?, (TokenDto | undefined)?]>{
      
      const tokenPayload:TokenPayload | null = await JwtAdapter.validateToken(encoded_token, tokenType)
      if(!tokenPayload) return ['The token is wrong or expired', undefined]
      const validationErrors = await AjvValidator.getInstance().validate("token", {...tokenPayload, value: encoded_token})
      if(validationErrors.length > 0) throw CustomError.badRequest(validationErrors[0])
      
      const {user_id, type, method} = tokenPayload

      return [undefined, new TokenDto(encoded_token, user_id, type, method)]
    }
}
