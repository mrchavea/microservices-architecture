"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogInUserDto = void 0;
class LogInUserDto {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
    static makeLoginUserDto(object) {
        const { email, password } = object;
        if (!email || !password)
            return ['Missing some data', undefined];
        if (email.length < 5)
            return ['Nombre muy corto', undefined];
        if (email.length < 5)
            return ['Nombre muy corto', undefined];
        // const isValid: boolean = userValidator(object)
        // if(!isValid) return [userValidator.errors[0], undefined];
        return [undefined, new LogInUserDto(email, password)];
    }
}
exports.LogInUserDto = LogInUserDto;
