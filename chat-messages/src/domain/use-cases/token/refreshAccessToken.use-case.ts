import { TokenDto } from "../../dtos/token.dto";
import { TokenRepository } from "../../repositories/token.repository";

interface refreshAccessTokenUseCase {
    execute( tokenDto: TokenDto): Promise<GeneratedToken>
}

interface GeneratedToken {
    access_token: string,
    access_token_expiration: number
}

export class RefreshAccessToken implements refreshAccessTokenUseCase {

    private readonly tokenRepository: TokenRepository

    constructor(tokenRepository: TokenRepository){
        this.tokenRepository = tokenRepository;
    }

    async execute(tokenDto: TokenDto): Promise<GeneratedToken> {
        
        const access_token = await this.tokenRepository.refreshAccessToken(tokenDto)
        console.log("ACCESS_TOKEN_USECASE", access_token, access_token.expiry_time.getTime())
        
        return {
            access_token: access_token.value,
            access_token_expiration: access_token.expiry_time.getTime()
        }
    }
    
}