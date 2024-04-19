import { TOKEN_TYPE, TokenPayload } from "../../../helpers";
import { TokenDto } from "../../dtos/token.dto";
import { CustomError } from "../../entities/error.entity";

interface validateAccessTokenUseCase {
    execute( encodedToken: string): Promise<ValidatedTokenData>
}

interface ValidatedTokenData {
    user_id: string
}

export class ValidateAccessToken implements validateAccessTokenUseCase {

    async execute(encodedToken: string): Promise<ValidatedTokenData> {
        
        const [error, tokenDto] = await TokenDto.makeTokenDto(encodedToken, TOKEN_TYPE.ACESS_TOKEN)        
        if(error) throw CustomError.badRequest(error)

        return {
            user_id: tokenDto?.user_id!
        }
    }
    
}