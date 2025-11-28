import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist | Hyper Cleaning Supplies",
  description: "View your saved cleaning products and supplies.",
};

export default function WishlistPage() {
  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <div className="py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">My Wishlist</h1>
          
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Start adding products you love to your wishlist</p>
            <a 
              href="/shop" 
              className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-3 rounded-md transition-colors"
            >
              Browse Products
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
