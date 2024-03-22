import { RegisterUserDto } from "../../dtos/registerUser.dto";
import { TokenRepository } from "../../repositories/token.repository";
import { UserRepository } from "../../repositories/user.repository";

interface RegisterUserUseCase {
    execute( registerUserDto: RegisterUserDto): Promise<UserToken>
}

interface UserToken {
    token: string,
    user: {
        name: string,
        email: string,
        id: string
    }
}

export class RegisterUser implements RegisterUserUseCase {

    private readonly userRepository: UserRepository
    private readonly tokenRepository: TokenRepository

    constructor(userRepository: UserRepository, tokenRepository: TokenRepository){
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
    }
    
    execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
        throw new Error("Method not implemented.");
    }

    

    // async execute(logInUserDto: RegisterUserDto): Promise<UserToken> {
        
    //     const user = await this.userRepository.authenticateUser(logInUserDto)
    //     const tokens = await this.tokenRepository.generateAccessTokens(user)
        
    //     return {
    //         access_token: tokens.access_token.value,
    //         refresh_token: tokens.refresh_token.value
    //     }
    // }
    
}