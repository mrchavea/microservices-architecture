import mongoose ,{ Schema } from "mongoose"

const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50
  },
  plan_id: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  subscription_id: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true
  }
});

export const ClientModel = mongoose.model("Client", clientSchema, "client");
