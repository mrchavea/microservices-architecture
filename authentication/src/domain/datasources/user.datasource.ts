import { LogInUserDto, RegisterUserDto, User } from "..";

export abstract class UserDatasource{

    abstract registerUser(registerUserDto: RegisterUserDto): Promise<User>

    abstract authenticateUser(LogInUserDto: LogInUserDto): Promise<User>

}