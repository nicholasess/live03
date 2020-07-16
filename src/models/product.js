const { model, Schema } = require("mongoose");

const DefaultSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    photo: { type: String },
    price: { type: Number, required: true },
    status: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("product", DefaultSchema);
