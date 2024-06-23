import { CustomError, RefreshAccessToken, TokenDto, ValidateAccessToken } from "../../domain";
import { TokenRepository } from "../../domain/repositories/token.repository";
import { TOKEN_TYPE } from "../../helpers/enums";

type gRPCFunction = (call:any, callback:any) => void

export class TokengRPCController{

    constructor(private readonly tokenRepository: TokenRepository){
    }
    
    private handleError = ( error: unknown, callback: any ) => {
        if ( error instanceof CustomError ) {
            return callback(null, { status: 
                {code: error.statusCode,
                    error: error.message}
                })
            }

        return callback(null, { status: 
            {code: 500,
             error: 'Internal Server Error'}
        })
    }


    public validateToken:gRPCFunction = async (call, callback) => {
        const {token} = call.request
        try {
            new ValidateAccessToken().execute(token)
            .then(tokenData => callback(null, { status: {code: 200}, user_id: tokenData.user_id}, ))
            .catch(err => this.handleError(err, callback))
        } catch (err) {
            this.handleError(err, callback)
        }
    }


    public refreshToken:gRPCFunction = async (call, callback) => {
        const {refresh_token} = call.request
        try {
            const [error, tokenDto] = await TokenDto.makeTokenDto(refresh_token, TOKEN_TYPE.REFRESH_TOKEN)
            if(error) throw CustomError.badRequest(error)
            new RefreshAccessToken(this.tokenRepository).execute(tokenDto!)
            .then(generatedToken => callback(null, { status: {code: 200}, access_token: generatedToken.access_token, acces_token_expiration:generatedToken.access_token_expiration}))
            .catch(err => this.handleError(err, callback))
        } catch (err) {
            this.handleError(err, callback)

        }
    }
}