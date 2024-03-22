import Ajv from "ajv"
import addFormats from "ajv-formats"
import { ClientJsonSchema,UserJsonSchema, TokenJsonSchema } from "./schemas";
import {  ValidateFunction } from "ajv/dist/core";

//Singleton pattern
export class AjvValidator{

    private static instance: AjvValidator;
    private validators:{[key:string]:ValidateFunction<unknown>} = {}
    private ajv_validator = new Ajv({ allErrors:true});

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

    public validate<T>(schemaName: string, data: T): string[] {
        const validator  = this.validators[schemaName]
        if(!validator) throw Error("Validator error!")

        const isValid = validator(data)
      
        if (!isValid) {
            if(!validator.errors) throw Error("Validator error!")
            let errors: string[] = []
            validator.errors.forEach(error =>  error.message ? errors.push(error.message) : null)
            return errors
        }

        return []
    }

    start(){
        addFormats(this.ajv_validator, {mode:"fast" ,formats:["date", "time","uuid","email","password","url"], keywords: true})
        this.compileSchema("user",UserJsonSchema)
        this.compileSchema("client",ClientJsonSchema)
        this.compileSchema("token",TokenJsonSchema)
    }
}