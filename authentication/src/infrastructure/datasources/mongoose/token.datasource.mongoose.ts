import { UserModel } from "../../../../database/mongoose/models";
import { TokenMapper } from "../../mappers";
import {CustomError, Token, TokenDatasource, TokenDto, User } from "../../../domain";
import {addTimeFromNow, TokenPayload, generatedToken, JwtAdapter, TOKEN_METHOD, TOKEN_TYPE} from "../../../helpers";

interface generateTokenFunction {
    ( payload: TokenPayload): Promise<generatedToken|null>
}

interface validateTokenFunction {
    ( token: string, type: TOKEN_TYPE ): Promise<{[key:string]:any} | null>
} 

export class TokenDatasourceMongoose implements TokenDatasource{

    private readonly generateToken: generateTokenFunction 
    private readonly validateToken: validateTokenFunction 

    constructor(generateToken: generateTokenFunction = JwtAdapter.generateToken, validateToken: validateTokenFunction = JwtAdapter.validateToken){
        this.generateToken = generateToken;
        this.validateToken = validateToken
    }


    async generateTokens(user: User): Promise<{ access_token: Token; refresh_token: Token; }> {
        //TODO: Receive mongoose transaction in order to revert user creation if error
        try {
            const access_token = await this.generateToken({user_id: user.id, method: TOKEN_METHOD.LOGIN, type: TOKEN_TYPE.ACESS_TOKEN})
            const refresh_token = await this.generateToken({user_id: user.id,  method: TOKEN_METHOD.LOGIN, type:TOKEN_TYPE.REFRESH_TOKEN})
            const access_token_expirationDate = addTimeFromNow(access_token?.duration!)
            const refresh_token_expirationDate = addTimeFromNow(refresh_token?.duration!)
            //Add refresh token to database
            const userUpdate = {tokens: {refresh_token: refresh_token?.token}}
            await UserModel.findOneAndUpdate({_id: user.id}, userUpdate)

            console.log("date?", access_token_expirationDate, refresh_token_expirationDate)

            const access_token_entity = await TokenMapper.tokenFromObject({
                value: access_token?.token,
                user_id: user.id,
                expiry_time: access_token_expirationDate,
                type: TOKEN_TYPE.ACESS_TOKEN,
                method: TOKEN_METHOD.LOGIN
            })

            const refresh_token_entity = await TokenMapper.tokenFromObject({
                value: refresh_token?.token,
                user_id: user.id,
                expiry_time: refresh_token_expirationDate,
                type: TOKEN_TYPE.REFRESH_TOKEN,
                method: TOKEN_METHOD.LOGIN
            })


            return {
                access_token: access_token_entity,
                refresh_token: refresh_token_entity
            }
        } catch (error) {
            console.log("CATCH", error)
            if(error instanceof CustomError) throw error
            throw CustomError.internalServer("Error generating access token")
        }
    }

    async refreshAccessToken(refresh_token: TokenDto): Promise<Token> {
        //const exist = UserModel.exists({tokens:{refresh_token: refresh_token.value}})
        const savedToken = await UserModel.findById(refresh_token.user_id,{tokens:{refresh_token: 1}})
        if(!savedToken || savedToken.tokens?.refresh_token != refresh_token.value) throw CustomError.badRequest("Token does not exist!")
        
        const access_token = await this.generateToken({user_id: refresh_token.user_id, method: TOKEN_METHOD.REFRESH, type: TOKEN_TYPE.ACESS_TOKEN})
        const access_token_expirationDate = addTimeFromNow(access_token?.duration!)
        
        console.log("EXIST?",access_token_expirationDate)
        return TokenMapper.tokenFromObject({
            user_id: refresh_token.user_id,
            value: access_token?.token,
            type: TOKEN_TYPE.ACESS_TOKEN,
            method: TOKEN_METHOD.REFRESH,
            expiry_time: access_token_expirationDate
        })
    }

    async existsToken(access_token: TokenDto): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async revocateToken(access_token: TokenDto): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}