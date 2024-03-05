const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50
  },
  plan_id: {
    type: UUID,
    required: true
  },
  subscription_id: {
    type: UUID,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model("Client", clientSchema, "client");
