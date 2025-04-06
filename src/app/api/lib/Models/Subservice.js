import mongoose from "mongoose";

const subserviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, 
      unique: true, 
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true, 
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

export default mongoose.models.SubService || mongoose.model("SubService", subserviceSchema);
