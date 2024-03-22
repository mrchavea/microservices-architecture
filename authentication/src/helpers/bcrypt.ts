import { compare, genSalt, hash } from "bcryptjs"
import { CustomError } from "../domain"

export class BcryptAdapter {

    static async hash(password:string): Promise<string> {
        try {
            const salt = await genSalt()
            return await hash(password, salt)
            
        } catch (error) {
            throw CustomError.internalServer()
        }
    }

    static async compare( password:string, hashedPassword: string): Promise<boolean> {
        try {
            return compare(password, hashedPassword)
        } catch (error) {
            throw CustomError.internalServer()
        }
    }
}