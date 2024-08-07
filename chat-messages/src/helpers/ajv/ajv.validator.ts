import { CustomError } from "@/domain";
import { ChatJsonSchema } from "./schemas";
import Ajv, { ValidateFunction } from "ajv"
import addFormats from "ajv-formats"
import ajvErrors from "ajv-errors"

//Singleton pattern
export class AjvValidator{

    private static instance: AjvValidator;
    private validators:{[key:string]:ValidateFunction} = {}
    private ajv_validator = new Ajv({ allErrors:true, messages:true, $data:true});

    private constructor(){}

    public static getInstance():AjvValidator{
        if(!AjvValidator.instance){
            AjvValidator.instance = new AjvValidator()
        }

        return AjvValidator.instance
    }

    private compileSchema(name:string, schema:{[key:string]:any}):void{
        const validator = this.ajv_validator.compile(schema)
        this.validators[name] = validator
    }

    public async validate<T>(schemaName: string, data: T): Promise<string[]> {
        console.log("DATA TO VALIDATE", data)
        const validator:ValidateFunction<unknown>  = this.validators[schemaName]
        if(!validator) throw Error("Validator error!")
        try {
            const isValid = await validator(data);
            if (isValid) return [];
        } catch (error: any | unknown) {
            console.log("CATCH", error)
            if(error instanceof Ajv.ValidationError && error.errors) {
                let errors: string[] = []
                error?.errors.forEach((error: {[key:string]:any}) =>  error.message ? errors.push(error.message) : null)
                return errors            
            }
        }
        throw CustomError.internalServer("Critical validation error!")
    }

    start(){
        ajvErrors(this.ajv_validator)
        addFormats(this.ajv_validator, {mode:"fast" ,formats:["date", "date-time", "time","uuid","email","url"], keywords: true})
        // Registrar el formato personalizado para ObjectId
        this.ajv_validator.addFormat('objectId', {
            type: 'string',
            validate: (data:string) => /^[0-9a-fA-F]{24}$/.test(data),
        });
        this.compileSchema("chat",ChatJsonSchema)
    }
}