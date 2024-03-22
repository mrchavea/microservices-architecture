import { LogInUserDto } from "../../dtos/logInUser.dto";
import { RegisterUserDto } from "../../dtos/registerUser.dto";
import { TokenRepository } from "../../repositories/token.repository";
import { UserRepository } from "../../repositories/user.repository";

interface LogInUserUseCase {
    execute( logInUserDto: LogInUserDto): Promise<LogInTokens>
}

interface LogInTokens {
    access_token: string,
    refresh_token: string
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
        const tokens = await this.tokenRepository.generateAccessTokens(user)
        
        return {
            access_token: tokens.access_token.value,
            refresh_token: tokens.refresh_token.value
        }
    }
    
}