import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  offer: String,
  price: String,
  image_url: String,
  manufacturer: String,
});

const Product = mongoose.model("Product", ProductSchema, "products");

export default Product;
