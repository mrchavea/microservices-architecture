import { LogInUserDto, RegisterUserDto, User } from "../";

export abstract class UserRepository{

    abstract registerUser (registerUserDto: RegisterUserDto): Promise<User>

    abstract authenticateUser(LogInUserDto: LogInUserDto): Promise<User>
}