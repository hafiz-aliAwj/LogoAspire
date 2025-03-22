import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, 
      unique: true, 
    },
    isActive: {
      type: Boolean,
      default: true, 
    },
    order: {
      type: Number,
      required: true, 
      min: 1, 
    },
  },
  {
    timestamps: true, 
  }
);

export default mongoose.models.Service || mongoose.model("Service", serviceSchema);
