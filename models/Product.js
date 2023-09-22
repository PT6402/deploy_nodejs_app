const mongoose = require("mongoose");
const Product = new mongoose.Schema({
  name_product: { type: String, required: true },
  image_product: { type: String, required: true, default: null },
  price_product: { type: Number, required: true },
  status_product: { type: Boolean, required: true, default: false },
});
module.exports = mongoose.model("Products", Product);
