// backend/src/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        images: { orderBy: { order: 'asc' } },
        colors: { orderBy: { order: 'asc' } },
        sizes: { orderBy: { order: 'asc' } },
      },
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get single product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        images: { orderBy: { order: 'asc' } },
        colors: { orderBy: { order: 'asc' } },
        sizes: { orderBy: { order: 'asc' } },
        bundles: true,
        pairsWith: true,
        relatedProducts: true,
      },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Create product
app.post('/api/products', async (req, res) => {
  try {
    const { name, price, description, productInfo, shippingDetails, badge } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        description,
        productInfo,
        shippingDetails,
        badge,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Add product image
app.post('/api/products/:id/images', async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl, alt, order } = req.body;

    const image = await prisma.productImage.create({
      data: {
        productId: parseInt(id),
        imageUrl,
        alt,
        order: order || 0,
      },
    });

    res.status(201).json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create product image' });
  }
});

// Add product color
app.post('/api/products/:id/colors', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, hexCode, order } = req.body;

    const color = await prisma.color.create({
      data: {
        productId: parseInt(id),
        name,
        hexCode,
        order: order || 0,
      },
    });

    res.status(201).json(color);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create color' });
  }
});

// Add product size
app.post('/api/products/:id/sizes', async (req, res) => {
  try {
    const { id } = req.params;
    const { size, order } = req.body;

    const sizeRecord = await prisma.size.create({
      data: {
        productId: parseInt(id),
        size,
        order: order || 0,
      },
    });

    res.status(201).json(sizeRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create size' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;