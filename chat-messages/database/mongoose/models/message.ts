import mongoose ,{ Schema } from "mongoose"

const MessageSchema = new Schema({
  text: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 200
  },
  chatId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  from: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  to: {
    type: mongoose.Types.ObjectId,
    required: false
  },
  sent_date: {  
    type: Date,
    default: Date.now,
    required: true
  }
});

const MessageModel = mongoose.model("Message", MessageSchema, "message");

export {MessageModel,MessageSchema}