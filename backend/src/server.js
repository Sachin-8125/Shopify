// backend/src/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

let PrismaClient;
let prisma = null;
let prismaAvailable = false;
try {
  PrismaClient = require('@prisma/client').PrismaClient;
  prisma = new PrismaClient();
  prismaAvailable = true;
} catch (err) {
  console.warn('Prisma client not available, running in mock mode. Reason:', err?.message || err);
}
const PORT = process.env.PORT || 5000;

// Middleware
const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    if (!prismaAvailable) {
      return res.json([]);
    }
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
    if (!prismaAvailable) {
      // serve mock immediately when Prisma isn't available
      const mockProduct = {
        id: parseInt(id),
        name: 'Premium Cotton T-Shirt',
        price: 49.99,
        badge: 'Popular',
        description: 'Mock description while DB initializes.',
        productInfo: 'Mock product info.',
        shippingDetails: 'Mock shipping details.',
        images: [
          { id: 1, productId: parseInt(id), imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop', alt: 'Front view', order: 0 },
          { id: 2, productId: parseInt(id), imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop', alt: 'Back view', order: 1 },
        ],
        colors: [
          { id: 1, productId: parseInt(id), name: 'White', hexCode: '#FFFFFF', order: 0 },
          { id: 2, productId: parseInt(id), name: 'Black', hexCode: '#000000', order: 1 },
        ],
        sizes: [
          { id: 1, productId: parseInt(id), size: 'S', order: 0 },
          { id: 2, productId: parseInt(id), size: 'M', order: 1 },
        ],
        bundles: [],
        pairsWith: [],
        relatedProducts: [],
      };
      return res.json(mockProduct);
    }
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