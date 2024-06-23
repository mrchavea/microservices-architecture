import { LogInUserDto, Token, TokenDatasource, TokenDto, TokenRepository, User } from "../../domain";

export class TokenRepositoryImpl implements TokenRepository{

    constructor(private tokenDatasource: TokenDatasource){}

    generateTokens(user: User): Promise<{ access_token: Token; refresh_token: Token; }> {
        return this.tokenDatasource.generateTokens(user)
    }
    
    refreshAccessToken(refresh_token: TokenDto): Promise<Token> {
        return this.tokenDatasource.refreshAccessToken(refresh_token)
    }
    existsToken(access_token: TokenDto): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    revocateToken(access_token: TokenDto): Promise<boolean> {
        throw new Error("Method not implemented.");
    }



}