import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  category: { type: String, required: true },
  atHome: { type: Boolean, default: false },
  orderAtHome: { type: Number, default: 0 },
  orderAtPage: { type: Number, default: 0 }
},
{
  timestamps: true, 
});

export default mongoose.models.Image || mongoose.model("Image", ImageSchema);
