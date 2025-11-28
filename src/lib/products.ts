import { prisma } from "@/lib/prisma";
import { Product as DbProduct } from "@prisma/client";
import { Product } from "@/types/product.types";

function mapDbProductToUi(product: DbProduct): Product {
  return {
    id: product.id,
    title: product.title,
    srcUrl: product.imageUrl,
    gallery: product.gallery ?? [],
    price: Number(product.price),
    discount: {
      amount: product.discountAmount,
      percentage: product.discountPercentage,
    },
    rating: product.rating,
    stock: product.stock,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return products.map(mapDbProductToUi);
}

export async function getProductById(id: number): Promise<Product | null> {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) return null;

  return mapDbProductToUi(product);
}

export async function getRelatedProducts(
  productId: number,
  limit = 4
): Promise<Product[]> {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) return [];

  const related = await prisma.product.findMany({
    where: {
      id: { not: productId },
      ...(product.categoryId && { categoryId: product.categoryId }),
    },
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  return related.map(mapDbProductToUi);
}


