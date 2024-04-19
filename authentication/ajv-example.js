// import Ajv, { ValidateFunction } from "ajv"
// import addFormats from "ajv-formats"
// import { ClientJsonSchema,UserJsonSchema, TokenJsonSchema } from "./src/helpers/ajv/schemas";

// //Singleton pattern
// export class AjvValidator{

//     private static instance: AjvValidator;
//     private validators:{[key:string]:ValidateFunction} = {}
//     private ajv_validator = new Ajv({ allErrors:true});

//     private constructor(){}

//     public static getInstance():AjvValidator{
//         if(!AjvValidator.instance){
//             AjvValidator.instance = new AjvValidator()
//         }

//         return AjvValidator.instance
//     }

//     private compileSchema(name:string, schema:{[key:string]:any}):void{
//         const validator = this.ajv_validator.compile(schema)
//         this.validators[name] = validator
//     }

//     public async validate<T>(schemaName: string, data: T): Promise<string[]> {
//         console.log("AJVVALIDATOR", this.ajv_validator.schemas)
//         const validator  = this.validators[schemaName]
//         if(!validator) throw Error("Validator error!")

//         console.log("ISVALID?", validator, data)
//         const isValid = await validator(data)
//         if (!isValid) {
//             if(!validator.errors) throw Error("Validator error!")
//             let errors: string[] = []
//             validator.errors.forEach(error =>  error.message ? errors.push(error.message) : null)
//             return errors
//         }

//         return []
//     }

//     start(){
//         addFormats(this.ajv_validator, {mode:"fast" ,formats:["date", "time","uuid","email","password","url"], keywords: true})
//         // Registrar el formato personalizado para ObjectId
//         this.ajv_validator.addFormat('objectId', {
//             type: 'string',
//             validate: (data:string) => /^[0-9a-fA-F]{24}$/.test(data),
//         });
//         const validator = this.compileSchema("user",UserJsonSchema)
//         console.log("VALIDATOR", validator)
//         this.compileSchema("client",ClientJsonSchema)
//         this.compileSchema("token",TokenJsonSchema)
//     }
// }
const addFormats = require("ajv-formats");
const UserJsonSchema = {
  $async: true,
  type: "object",
  additionalProperties: false,
  properties: {
    id: {
      type: "string",
      format: "objectId"
    },
    client_id: {
      type: "string",
      format: "objectId"
    },
    name: {
      type: "string",
      minLength: 2,
      maxLength: 50
    },
    username: {
      type: "string",
      minLength: 2,
      maxLength: 50
    },
    email: {
      type: "string",
      format: "email"
    },
    password: {
      type: "string",
      format: "password"
    }
  },
  required: ["name", "username", "password", "email", "client_id"]
};
const Ajv = require("ajv");

const ajv = new Ajv({ allErrors: true });
addFormats(ajv, {
  mode: "fast",
  formats: ["date", "time", "uuid", "email", "password", "url"],
  keywords: true
});
// Registrar el formato personalizado para ObjectId
ajv.addFormat("objectId", {
  type: "string",
  validate: (data) => /^[0-9a-fA-F]{24}$/.test(data)
});
const validator = ajv.compile(UserJsonSchema);
// const valid = validator({
//   username: "daniel.castilla",
//   client_id: "51b368ef-4f4d-4365-8515-7848cce02f4c",
//   name: "Daniel Castilla",
//   email: "dani@example.es",
//   password: "123"
// });
async function asyncValidateData(validator, data) {
  try {
    if (!validator) console.log("!validator");
    const valid = await validator(data);
    console.log("VALID", valid);
    if (valid) return true;
    throw Error("CUSTOM", validator?.errors);
  } catch (error) {
    console.log(
      "CATCH",
      error?.errors[0].message,
      error instanceof Ajv.ValidationError
    );
    return false;
  }
}

const data = {
  username: "daniel.castilla",
  client_id: "51b368ef-4f4d-4365-8515-7848cce02f4c",
  name: "Daniel Castilla",
  email: "dani@example.es",
  password: "123"
};

// const isValid = validator(data);
// console.log(isValid, validator?.errors);
(async () => {
  const validation = await asyncValidateData(validator, data);
  console.log("VALIDATION", validation);
})();
