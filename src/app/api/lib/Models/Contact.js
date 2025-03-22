import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, 
      trim: true,    
    },
    email: {
      type: String,
      required: true, 
      lowercase: true, 
    },
    phone: {
      type: String,
      required: true,  
    },
    date: {
      type: Date,
      default: Date.now, 
    },
    contacted: {
      type: Boolean,
      default: false, 
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export default Contact;