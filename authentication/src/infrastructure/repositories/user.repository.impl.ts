import { LogInUserDto, RegisterUserDto, Token, TokenDatasource, User, UserRepository } from "../../domain";
import { UserDatasource } from "../../domain/datasources/user.datasource";

export class UserRepositoryImpl implements UserRepository{

    constructor(private userDatasource: UserDatasource){}
    
    registerUser(registerUserDto: RegisterUserDto): Promise<User> {
        return this.userDatasource.registerUser(registerUserDto)
    }
    authenticateUser(LogInUserDto: LogInUserDto): Promise<User> {
        return this.userDatasource.authenticateUser(LogInUserDto)
    }
}