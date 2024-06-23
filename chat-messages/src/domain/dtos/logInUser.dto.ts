
export class LogInUserDto {
    email:string
    password:string  
    private constructor(email:string, password:string){
        this.email = email;
        this.password = password
    }

    static makeLoginUserDto( object: {[key: string]: any}) : [string?, LogInUserDto?]{
        const {email, password} = object
        if(!email || !password) return ['Missing some data', undefined]
        if(email.length < 5) return ['Nombre muy corto', undefined]
        if(email.length < 5) return ['Nombre muy corto', undefined]
        // const isValid: boolean = userValidator(object)
        // if(!isValid) return [userValidator.errors[0], undefined];
        return [undefined, new LogInUserDto(email, password)]
    }
}
