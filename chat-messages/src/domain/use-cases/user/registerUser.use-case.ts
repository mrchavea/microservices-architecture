import { RegisterUserDto } from "../../dtos/registerUser.dto";
import { Token } from "../../entities/ token.entity";
import { User } from "../../entities/ user.entity";
import { CustomError } from "../../entities/error.entity";
import { TokenRepository } from "../../repositories/token.repository";
import { UserRepository } from "../../repositories/user.repository";

interface RegisterUserUseCase {
    execute( registerUserDto: RegisterUserDto): Promise<UserToken>
}

interface UserToken {
    tokens: {
        access_token:Token,
        refresh_token: Token,
    },
    user: User
}

export class RegisterUser implements RegisterUserUseCase {

    private readonly userRepository: UserRepository
    private readonly tokenRepository: TokenRepository

    constructor(userRepository: UserRepository, tokenRepository: TokenRepository){
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
    }
    
    async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
            const user = await this.userRepository.registerUser(registerUserDto)
            const tokens = await this.tokenRepository.generateTokens(user)
    
            return {
                user: user,
                tokens: {
                    access_token: tokens.access_token,
                    refresh_token: tokens.refresh_token
                }
            }
    }
    
}