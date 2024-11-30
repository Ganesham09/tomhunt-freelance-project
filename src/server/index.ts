import express from 'express';
import { connectDB } from '../lib/db';
import { Product } from '../models/Product';
import multer from 'multer';
import path from 'path';

const app = express();
const upload = multer({ dest: 'uploads/' });

connectDB();

app.post('/api/products', upload.array('images'), async (req, res) => {
  try {
    const {
      imei,
      model,
      brand,
      price,
      customerName,
      customerPhone,
      customerEmail,
      insuranceType,
      additionalDetails,
      storeId
    } = req.body;

    const files = req.files as Express.Multer.File[];
    const productImages = files.map(file => `/uploads/${file.filename}`);

    const product = new Product({
      imei,
      model,
      brand,
      purchaseDate: new Date(),
      price: parseFloat(price),
      customerName,
      customerPhone,
      customerEmail,
      insuranceType,
      productImages,
      additionalDetails,
      storeId
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.get('/api/products/:imei', async (req, res) => {
  try {
    const { imei } = req.params;
    const { storeId } = req.query;

    const product = await Product.findOne({ imei, storeId });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});