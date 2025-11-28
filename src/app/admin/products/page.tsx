import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const productImages = [
  "/images/products/cleaner1.jpg",
  "/images/products/cleaner2.jpg",
  "/images/products/detergent.jpg",
  "/images/products/gloves.jpg",
  "/images/products/oxiclean.jpg",
  "/images/products/powder.jpg",
  "/images/products/dete3.webp",
  "/images/products/dete4.webp",
];

const getProductImage = (id: number): string => productImages[id % productImages.length];

export default async function AdminProductsPage() {
  const session = await getServerSession(authOptions);
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!session || !session.user?.email || !adminEmail) {
    redirect("/");
  }

  if (session.user.email !== adminEmail) {
    redirect("/");
  }

  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-frame mx-auto px-4 xl:px-0 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Products</h1>
          <p className="text-sm text-black/60 mt-1">{products.length} total products</p>
        </div>
        <Link
          href="/admin/products/new"
          className="px-6 py-3 rounded-full bg-black text-white text-sm font-medium hover:bg-black/90 transition-colors"
        >
          + New Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 border border-black/10 rounded-2xl">
          <p className="text-black/60 mb-4">No products found yet.</p>
          <Link
            href="/admin/products/new"
            className="inline-block px-6 py-3 bg-black text-white rounded-full text-sm font-medium"
          >
            Create Your First Product
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {products.map((product) => {
            const hasDiscount = product.discountPercentage > 0 || product.discountAmount > 0;
            const discountedPrice = product.discountPercentage > 0
              ? Number(product.price) - (Number(product.price) * product.discountPercentage / 100)
              : Number(product.price) - product.discountAmount;

            return (
              <Link
                key={product.id}
                href={`/admin/products/${product.id}`}
                className="block border border-black/10 rounded-2xl p-5 hover:border-black/30 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={getProductImage(product.id)}
                      alt={product.title}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-black truncate">{product.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-black/60">
                      <span>ID: {product.id}</span>
                      <span>•</span>
                      <span>{product.category?.name ?? "No Category"}</span>
                      <span>•</span>
                      <span>Stock: {product.stock}</span>
                      <span>•</span>
                      <span>Rating: {product.rating.toFixed(1)}⭐</span>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="text-right flex-shrink-0">
                    {hasDiscount ? (
                      <div>
                        <p className="text-sm text-black/50 line-through">
                          ${Number(product.price).toFixed(2)} NZD
                        </p>
                        <p className="text-lg font-bold text-green-600">
                          ${discountedPrice.toFixed(2)} NZD
                        </p>
                        <p className="text-xs text-sky-500 font-medium">
                          {product.discountPercentage > 0 
                            ? `-${product.discountPercentage}%` 
                            : `-$${product.discountAmount}`}
                        </p>
                      </div>
                    ) : (
                      <p className="text-lg font-bold">
                        ${Number(product.price).toFixed(2)} NZD
                      </p>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}


