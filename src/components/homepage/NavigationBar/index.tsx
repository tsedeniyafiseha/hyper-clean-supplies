"use client";

import Link from "next/link";
import React from "react";

const categories = [
  { name: "Cleaning Chemicals", slug: "cleaning-chemicals", icon: "🧪" },
  { name: "Bathroom Care", slug: "bathroom-care", icon: "🧴" },
  { name: "Kitchen Care", slug: "kitchen-care", icon: "🍽️" },
  { name: "Floor Care", slug: "floor-care", icon: "🧹" },
  { name: "Dispensers", slug: "dispensers", icon: "🧻" },
  { name: "Gloves & PPE", slug: "gloves", icon: "🧤" },
  { name: "Paper Products", slug: "paper-products", icon: "📄" },
];

const NavigationBar = () => {
  return (
    <section className="bg-white border-y border-gray-100">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <div className="flex items-center overflow-x-auto scrollbar-hide py-4 gap-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/shop/category/${category.slug}`}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-yellow-50 hover:border-yellow-200 rounded-full border border-gray-100 whitespace-nowrap transition-all"
            >
              <span className="text-lg">{category.icon}</span>
              <span className="text-sm font-medium text-gray-700">{category.name}</span>
            </Link>
          ))}
          <Link
            href="/shop"
            className="flex items-center gap-2 px-4 py-2.5 bg-yellow-500 hover:bg-yellow-400 rounded-full whitespace-nowrap transition-all"
          >
            <span className="text-sm font-bold text-black">View All →</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NavigationBar;