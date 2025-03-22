import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import { connectDB } from "../../lib/database";

const MONGODB_URI = process.env.MONGODB_URI;

// Configure GridFS Storage
const storage = new GridFsStorage({
  url: MONGODB_URI,
  file: (req, file) => ({
    filename: file.originalname,
    bucketName: "uploads",
  }),
});

const upload = multer({ storage }).single("image");

export async function POST(req) {
  await connectDB();

  return new Promise((resolve) => {
    upload(req, null, async (err) => {
      if (err) return resolve(Response.json({ error: err.message }, { status: 400 }));

      const { name, category, subCategory, atHome, orderAtHome, orderAtPage , isActive = true} = req.body;

      // Save metadata in the Image collection
      const newImage = new Image({
        filename: req.file.filename,
        name,
        category,
        subCategory,
        atHome, 
        isActive,
        orderAtHome: parseInt(orderAtHome) || 0,
        orderAtPage: parseInt(orderAtPage) || 0,
      });

      await newImage.save();
      resolve(Response.json({ message: "Image uploaded successfully!" }, { status: 201 }));
    });
  });
}
