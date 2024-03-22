import { LogInUserDto, Token, TokenDatasource, TokenDto, TokenRepository, User } from "../../domain";

export class TokenRepositoryImpl implements TokenRepository{

    constructor(private tokenDatasource: TokenDatasource){}

    generateAccessTokens(user: User): Promise<{ access_token: Token; refresh_token: Token; }> {
        return this.tokenDatasource.generateAccessTokens(user)
    }
    
    generateRefreshToken(refresh_token: TokenDto): Promise<Token> {
        throw new Error("Method not implemented.");
    }
    existsToken(access_token: TokenDto): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    revocateToken(access_token: TokenDto): Promise<boolean> {
        throw new Error("Method not implemented.");
    }



}