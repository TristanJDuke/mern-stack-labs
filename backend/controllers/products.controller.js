import mongoose from 'mongoose';
import Product from '../models/products.models.js';


export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({})

    res.status(200).json({
        success: true,
        data: products,
        message: 'Products fetched successfully'
  })
    } catch (error) {
    res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
    });
  }
};
export const getProductById = async (req, res) => {
  const { id } = req.params;
    try {
        const product = await Product.findById(id);
        
        res.status(200).json({
            success: true,
            data: product,
            message: 'Product fetched successfully'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};
export const createProduct = async (req, res) => {
  const { title, image, description, price } = req.body;

    try {
        const newProduct = new Product({
            title,
            image,
            description,
            price
        });

        const savedProduct = await newProduct.save();
        res.status(201).json({
            success: true,
            data: savedProduct,
            message: 'Product created successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }
    try {
        await Product.findByIdAndUpdate(id, product, { new: true });

        const allProducts = await Product.find();

        res.status(200).json({
            success: true,
            data: allProducts,
            message: 'Product updated successfully'
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        })
    }
};
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Export the controller functions for use in routes
export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};  