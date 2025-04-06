import mongoose from "mongoose"

const ImageSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    serviceId: { type: mongoose.Types.ObjectId, ref: "Service", required: true },
    subServiceId: [{ type: mongoose.Types.ObjectId, ref: "SubService", required: true }],
    atHome: { type: Boolean, default: false },
    orderAtHome: { type: Number, default: -1 },
    orderAtPage: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Image || mongoose.model("Image", ImageSchema)

