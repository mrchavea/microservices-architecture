import { UserModel } from "../../../../database/mongoose/models";
import {CustomError, Token, TokenDatasource, TokenDto, User } from "../../../domain";
import { JwtAdapter, generatedToken } from "../../../helpers/jwt";
import { TokenMapper } from "../../mappers";

interface generateTokenFunction {
    ( payload: Object, type: 'LOGIN' | 'REFRESH'): Promise<generatedToken|null>
}

interface validateTokenFunction {
    <T>( token: string, tokenType: 'LOGIN' | 'REFRESH' ): Promise<T | null>
} 

export class TokenDatasourceMongoose implements TokenDatasource{

    private readonly generateToken: generateTokenFunction 
    private readonly validateToken: validateTokenFunction 

    constructor(generateToken: generateTokenFunction = JwtAdapter.generateToken, validateToken: validateTokenFunction = JwtAdapter.validateToken){
        this.generateToken = generateToken;
        this.validateToken = validateToken
    }


    async generateAccessTokens(user: User): Promise<{ access_token: Token; refresh_token: Token; }> {
        try {
            const access_token = await this.generateToken({id: user.id}, 'LOGIN')
            const refresh_token = await this.generateToken({id: user.id}, 'REFRESH')
            
            //Add refresh token to database
            const userUpdate = {tokens: {refresh_token: refresh_token}}
            await UserModel.findOneAndUpdate({id: user.id}, userUpdate)

            const access_token_entity = await TokenMapper.tokenFromObject({
                value: access_token?.token,
                user_id: user.id,
                expiry_time: undefined,
                type: 'LOGIN'
            })

            const refresh_token_entity = await TokenMapper.tokenFromObject({
                value: refresh_token?.token,
                user_id: user.id,
                expiry_time: refresh_token?.duration,
                type: 'REFRESH'
            })


            return {
                access_token: access_token_entity,
                refresh_token: refresh_token_entity
            }
        } catch (error) {
            if(error instanceof CustomError) throw error
            throw CustomError.internalServer("Error generating access token")
        }
    }

    async generateRefreshToken(refresh_token: TokenDto): Promise<Token> {
                    // const databaseUser = await UserModel.findOneAndUpdate({_id:user.id}, {tokens : })
            // if()
            // await token.save()
            // return TokenMapper.tokenFromObject(token)
        throw new Error("Method not implemented.");
    }

    async existsToken(access_token: TokenDto): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async revocateToken(access_token: TokenDto): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}