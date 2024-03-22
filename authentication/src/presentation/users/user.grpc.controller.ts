import { CustomError, LogInUser, LogInUserDto, TokenDto, TokenRepository, UserRepository } from "../../domain";

type gRPCFunction = (call:any, callback:any) => void

export class UsergRPCController{

    constructor(private readonly userRepository: UserRepository, private readonly tokenRepository: TokenRepository){
    }

    private handleError = ( error: unknown, callback: any ) => {
        if ( error instanceof CustomError ) {
            return callback(null, { status: 
                {code: error.statusCode,
                 error: error.message}
            })
        }
    
        console.log(error); // Winston
        return callback(null, { status: 
            {code: 500,
             error: 'Internal Server Error'}
        })
    }

    authenticateUser:gRPCFunction = async (call, callback) => {
        const {email, password} = call.request
        try {
            const [error, logInUserDto] = LogInUserDto.makeLoginUserDto({email, password})
            if(error) throw CustomError.badRequest(error)
            new LogInUser(this.userRepository, this.tokenRepository)
                .execute(logInUserDto!)
                .then(tokens => callback(null, 
                    {   status: 
                        {code: 200},
                        access_token: tokens.access_token,
                        refresh_token: tokens.refresh_token

                    }))
                .catch(err => this.handleError(err, callback))
        } catch (err) {
            this.handleError(err, callback)
        }
        
    }

    registerUser:gRPCFunction = async (call, callback) => {
        
    }
}