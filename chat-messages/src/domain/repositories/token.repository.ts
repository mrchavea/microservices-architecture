import { Token } from "../entities/ token.entity";
import { TokenDto, User } from "..";

export abstract class TokenRepository{

    abstract generateTokens(user: User): Promise<{access_token : Token, refresh_token : Token}>

    abstract refreshAccessToken(refresh_token: TokenDto, ): Promise<Token>

    abstract existsToken(access_token:TokenDto, ): Promise<boolean>

    abstract revocateToken(access_token:TokenDto, ): Promise<boolean>
}