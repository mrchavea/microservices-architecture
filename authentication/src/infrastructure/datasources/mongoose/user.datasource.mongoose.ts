import { ClientModel, UserModel } from "../../../../database/mongoose/models";
import { BcryptAdapter } from "../../../helpers/bcrypt";
import { UserDatasource, RegisterUserDto, User, CustomError, LogInUserDto } from "../../../domain";
import { UserMapper } from "../../mappers/user.mapper";

type HashFunction = (password:string) => Promise<string>
type CompareFunction = (password:string, hashedPassword:string) => Promise<boolean>


export class UserDatasourceMongoose implements UserDatasource{

    private readonly hashPassword: HashFunction 
    private readonly comparePassword: CompareFunction

    constructor(hashPassword: HashFunction = BcryptAdapter.hash, comparePassword: CompareFunction  = BcryptAdapter.compare){
        this.hashPassword = hashPassword;
        this.comparePassword = comparePassword
    }

    async registerUser(registerUserDto: RegisterUserDto): Promise<User> {
        const {name, email, client_id, password, username} = registerUserDto
        try {
            const userExists = await UserModel.exists({email:email})
            if(userExists) throw CustomError.badRequest("User already exists")
            const client = await ClientModel.findById(client_id)
            if(!client) throw CustomError.badRequest("Client does not exists")
            //Check if are users left to create
            //if(client.activeUsers)
            const user = await UserModel.create({
                name,
                email,
                client_id,
                password: await this.hashPassword(password), 
                username
            })
            await user.save()
            return UserMapper.userFromObject(user)
        } catch (error) {
            if(error instanceof CustomError) throw error
            console.log("DATS ERR", error)
            throw CustomError.badRequest('Error creating user')
        }
    }
    
    async authenticateUser(logInUserDto: LogInUserDto): Promise<User> {
        const {email, password} = logInUserDto;
        try {
            const user = await UserModel.findOne({email})
            if(!user) throw CustomError.badRequest("Email or password wrong")
            if(!await this.comparePassword(password, user.password)) throw CustomError.badRequest("Email or password wrong")
            return UserMapper.userFromObject(user)
        } catch (error) {
            if(error instanceof CustomError) throw error
            throw CustomError.internalServer('Log in error')
        }
    }
}