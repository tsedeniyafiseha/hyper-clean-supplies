import ProductListSec from "@/components/common/ProductListSec";
import Brands from "@/components/homepage/Brands";
import Header from "@/components/homepage/Header";
import Sidebar from "@/components/homepage/Sidebar";
import BrowseByCategory from "@/components/homepage/BrowseByCategory";
import Reviews from "@/components/homepage/Reviews";
import { Review } from "@/types/review.types";
import { getAllProducts } from "@/lib/products";

export const reviewsData: Review[] = [
  {
    id: 1,
    user: "Alex K.",
    content: '"Finding quality cleaning supplies that meet professional standards used to be a challenge until I discovered Hyper Cleaning Supplies."',
    rating: 5,
    date: "August 14, 2023",
  },
  {
    id: 2,
    user: "Sarah M.",
    content: `"I'm blown away by the quality and effectiveness of the cleaning products I received. Every product has exceeded my expectations."`,
    rating: 5,
    date: "August 15, 2023",
  },
  {
    id: 3,
    user: "Ethan R.",
    content: `"The multi-purpose cleaner is a must-have for anyone who values efficiency. The powerful yet safe formula is perfect."`,
    rating: 5,
    date: "August 16, 2023",
  },
  {
    id: 4,
    user: "Olivia P.",
    content: `"As a facility manager, I value products that are both effective and safe. These cleaning supplies deliver outstanding results."`,
    rating: 5,
    date: "August 17, 2023",
  },
  {
    id: 5,
    user: "Liam K.",
    content: `"The nitrile gloves are a perfect combination of durability and comfort. The quality is excellent."`,
    rating: 5,
    date: "August 18, 2023",
  },
  {
    id: 6,
    user: "Samantha D.",
    content: `"I absolutely love the dispenser systems! The design is practical and the quality is outstanding."`,
    rating: 5,
    date: "August 19, 2023",
  },
];

export default async function Home() {
  const allProducts = await getAllProducts();
  const newArrivalsData = allProducts.slice(0, 8);
  const topSellingData = [...allProducts].sort((a, b) => b.rating - a.rating).slice(0, 8);

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <BrowseByCategory />
      <Brands />
      
      {/* Main Content with Sidebar */}
      <div className="max-w-frame mx-auto px-4 xl:px-0 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <Sidebar />
          
          {/* Products Section */}
          <main className="flex-1">
            <ProductListSec title="NEW ARRIVALS" data={newArrivalsData} viewAllLink="/shop#new-arrivals" />
            <div className="my-12">
              <hr className="h-[1px] border-t-gray-200" />
            </div>
            <ProductListSec title="TOP SELLING" data={topSellingData} viewAllLink="/shop#top-selling" />
          </main>
        </div>
      </div>

      <div className="py-12 bg-white">
        <Reviews data={reviewsData} />
      </div>
    </div>
  );
}