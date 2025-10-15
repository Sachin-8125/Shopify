// backend/prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.productImage.deleteMany();
  await prisma.color.deleteMany();
  await prisma.size.deleteMany();
  await prisma.productBundle.deleteMany();
  await prisma.pairsWith.deleteMany();
  await prisma.relatedProduct.deleteMany();
  await prisma.product.deleteMany();

  // Create main product
  const mainProduct = await prisma.product.create({
    data: {
      name: 'Premium Cotton T-Shirt',
      price: 49.99,
      badge: 'Popular',
      description: `Experience ultimate comfort with our Premium Cotton T-Shirt. Made from 100% organic cotton, this versatile piece is perfect for everyday wear. The soft fabric feels great against your skin and maintains its quality even after multiple washes.

Features:
- Breathable and lightweight
- Perfect for all seasons
- Easy to care for
- Available in multiple colors and sizes
- Ethically sourced materials`,
      productInfo: `Material: 100% Organic Cotton
Weight: 160 gsm (grams per square meter)
Fit: Classic unisex fit
Care: Machine wash cold, tumble dry low
Made in: Portugal

Our Premium Cotton T-Shirt is designed for those who appreciate quality and comfort. Each shirt is crafted with attention to detail and made using sustainable practices.`,
      shippingDetails: `Free shipping on orders over $50
Standard Shipping: 5-7 business days
Express Shipping: 2-3 business days (+$9.99)
Next Day Shipping: 1 business day (+$19.99)

All orders are carefully packaged and tracked. We ship to over 180 countries worldwide.`,
    },
  });

  // Add product images
  const images = await Promise.all([
    prisma.productImage.create({
      data: {
        productId: mainProduct.id,
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop',
        alt: 'Front view',
        order: 0,
      },
    }),
    prisma.productImage.create({
      data: {
        productId: mainProduct.id,
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
        alt: 'Back view',
        order: 1,
      },
    }),
    prisma.productImage.create({
      data: {
        productId: mainProduct.id,
        imageUrl: 'https://images.unsplash.com/photo-1489315783612-cd4628902c4a?w=800&h=800&fit=crop',
        alt: 'Side view',
        order: 2,
      },
    }),
    prisma.productImage.create({
      data: {
        productId: mainProduct.id,
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop',
        alt: 'Detail view',
        order: 3,
      },
    }),
    prisma.productImage.create({
      data: {
        productId: mainProduct.id,
        imageUrl: 'https://images.unsplash.com/photo-1492289944127-5a14ba2d0a1b?w=800&h=800&fit=crop',
        alt: 'Lifestyle view',
        order: 4,
      },
    }),
  ]);

  // Add colors
  const colors = await Promise.all([
    prisma.color.create({
      data: {
        productId: mainProduct.id,
        name: 'White',
        hexCode: '#FFFFFF',
        order: 0,
      },
    }),
    prisma.color.create({
      data: {
        productId: mainProduct.id,
        name: 'Black',
        hexCode: '#000000',
        order: 1,
      },
    }),
    prisma.color.create({
      data: {
        productId: mainProduct.id,
        name: 'Navy',
        hexCode: '#001F3F',
        order: 2,
      },
    }),
    prisma.color.create({
      data: {
        productId: mainProduct.id,
        name: 'Gray',
        hexCode: '#808080',
        order: 3,
      },
    }),
    prisma.color.create({
      data: {
        productId: mainProduct.id,
        name: 'Blue',
        hexCode: '#0074D9',
        order: 4,
      },
    }),
  ]);

  // Add sizes
  const sizes = await Promise.all([
    prisma.size.create({
      data: {
        productId: mainProduct.id,
        size: 'XS',
        order: 0,
      },
    }),
    prisma.size.create({
      data: {
        productId: mainProduct.id,
        size: 'S',
        order: 1,
      },
    }),
    prisma.size.create({
      data: {
        productId: mainProduct.id,
        size: 'M',
        order: 2,
      },
    }),
    prisma.size.create({
      data: {
        productId: mainProduct.id,
        size: 'L',
        order: 3,
      },
    }),
    prisma.size.create({
      data: {
        productId: mainProduct.id,
        size: 'XL',
        order: 4,
      },
    }),
    prisma.size.create({
      data: {
        productId: mainProduct.id,
        size: '2XL',
        order: 5,
      },
    }),
  ]);

  console.log('✅ Database seeded successfully!');
  console.log(`Created product: ${mainProduct.name}`);
  console.log(`Added ${images.length} images`);
  console.log(`Added ${colors.length} colors`);
  console.log(`Added ${sizes.length} sizes`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });