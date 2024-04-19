import { LogInUserDto } from "../../dtos/logInUser.dto";
import { RegisterUserDto } from "../../dtos/registerUser.dto";
import { Token } from "../../entities/ token.entity";
import { TokenRepository } from "../../repositories/token.repository";
import { UserRepository } from "../../repositories/user.repository";

interface LogInUserUseCase {
    execute( logInUserDto: LogInUserDto): Promise<LogInTokens>
}

interface LogInTokens {
    access_token: Token,
    refresh_token: Token
}

export class LogInUser implements LogInUserUseCase {

    private readonly userRepository: UserRepository
    private readonly tokenRepository: TokenRepository

    constructor(userRepository: UserRepository, tokenRepository: TokenRepository){
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
    }

    async execute(logInUserDto: LogInUserDto): Promise<LogInTokens> {
        
        const user = await this.userRepository.authenticateUser(logInUserDto)
        const tokens = await this.tokenRepository.generateTokens(user)
        
        return {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token
        }
    }
    
}