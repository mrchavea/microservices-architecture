import { Token } from "../entities/ token.entity";
import { LogInUserDto } from "../dtos/logInUser.dto";
import { TokenDto, User } from "..";

export abstract class TokenRepository{

    abstract generateAccessTokens(user: User): Promise<{access_token : Token, refresh_token : Token}>

    abstract generateRefreshToken(refresh_token: TokenDto, ): Promise<Token>

    abstract existsToken(access_token:TokenDto, ): Promise<boolean>

    abstract revocateToken(access_token:TokenDto, ): Promise<boolean>
}