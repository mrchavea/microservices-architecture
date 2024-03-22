import mongoose, {Schema} from "mongoose";

const tokensSchema = {
  access_token: {
    type: String,
  },
  refresh_token: {
    type:String,
    required: true
  }
}

const userSchema = new Schema({
  client_id: {
    type: 'UUID',
    required: true
  },
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value:string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email address format"
    }
  },
  username: {
    type: "string",
    required: true,
    unique: true,
    minLength: 2,
    maxLength: 50
  },
  password: {
    type: "string",
    required: true,
    minLength: 6,
    maxLength: 50
  },
  tokens: {
    type: tokensSchema,
    required: false
  }
});


export const UserModel = mongoose.model("User", userSchema, "user")