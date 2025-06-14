import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true, // Assuming image is a URL or path to the image
  },
  description: {
    type: String,
    required: true, // Assuming description is a string
  },
  price: {
    type: String,
    required: true, // Assuming price is a number
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

const Product = mongoose.model('Product', productSchema);

export default Product;