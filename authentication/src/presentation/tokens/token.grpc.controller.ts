import { TokenDto } from "../../domain";
import { TokenRepository } from "../../domain/repositories/token.repository";

type gRPCFunction = (call:any, callback:any) => void

export class TokengRPCController{

    constructor(private readonly tokenRepository: TokenRepository){
    }

    //No need to implement that call. It should be called logInUser instead
    // public generateAccessToken:gRPCFunction = async (call, callback) => {
    //     const {} = call
    //     const token = this.tokenRepository.generateAccessToken()
    // }

    // public getAccessToken:gRPCFunction = async (call, callback) => {
    //     const [error, ]
    // }

    public verifyToken:gRPCFunction = async (call, callback) => {

    }

    public refreshToken:gRPCFunction = async (call, callback) => {
        const [error, tokenDto] = TokenDto.makeTokenDto(call?.request?.access_token, "REFRESH_TOKEN")
        if(error) callback(null, {access_token: null, status: 0})
        this.tokenRepository.generateRefreshToken(tokenDto!)
            .then(token => callback(null, { access_token: token.value, status: 1 }))
            .catch(err => callback(null, {access_token: null, status: 0}))
    }
}