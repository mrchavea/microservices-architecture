import mongoose ,{ Schema } from "mongoose"
import { MessageSchema } from "./message"

const ChatSchema = new Schema({
  name: {
    type: String,
    required: false,
    minLength: [2, 'The name is to short'],
    maxLength: [50, 'The name is to long']
  },
  slug: {
    type: String,
    required: true,
    minLength: [2, 'The name is to short'],
    maxLength: [50, 'The name is to long'],
    unique: true
  },
  recent_messages: {
    type: [MessageSchema],
    required: true
  },
  users: {
    type: [mongoose.Types.ObjectId],
    required: true
  }
});

export const ChatModel = mongoose.model("Chat", ChatSchema, "chat");
