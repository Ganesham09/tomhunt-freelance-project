import mongoose from "mongoose";

// Define the product schema
const productSchema = new mongoose.Schema({
  imei: { type: String, required: true, unique: true }, // IMEI number
  model: { type: String, required: true }, // Product model name
  brand: { type: String, required: true }, // Product brand
  purchaseDate: { type: Date, required: true }, // Date of purchase
  price: { type: Number, required: true }, // Product price
  customerName: { type: String, required: true }, // Customer's name
  customerPhone: { type: String, required: true }, // Customer's phone number
  customerEmail: { type: String, required: true }, // Customer's email
  insuranceType: {
    type: String,
    required: true,
    enum: ["body", "screen", "back", "full"], // Types of insurance
  },
  customerAadhar: { type: String, required: true }, // Customer's email
  productImages: { type: [String], default: [] }, // Array of image URLs
  additionalDetails: { type: String, default: "" }, // Optional additional details
  storeId: { type: String, required: true }, // Store ID for reference
  createdAt: { type: Date, default: Date.now }, // Creation timestamp
});

// Create the Product model from the schema
export const Product = mongoose.model("Product", productSchema);
