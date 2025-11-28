"use client";

import Link from "next/link";
import React from "react";

const categories = [
  { name: "Cleaning Chemicals", slug: "cleaning-chemicals", icon: "🧪", count: 24 },
  { name: "Bathroom Care", slug: "bathroom-care", icon: "🧴", count: 18 },
  { name: "Kitchen Care", slug: "kitchen-care", icon: "🍽️", count: 12 },
  { name: "Floor Care", slug: "floor-care", icon: "🧹", count: 15 },
  { name: "Dispensers", slug: "dispensers", icon: "🧻", count: 10 },
  { name: "Gloves & PPE", slug: "gloves", icon: "🧤", count: 22 },
  { name: "Paper Products", slug: "paper-products", icon: "📄", count: 14 },
];

const CategorySidebar = () => {
  return (
    <section className="bg-white py-8">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-yellow-500 text-black px-6 py-4">
            <h3 className="font-bold text-lg flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Browse All Categories
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                href={`/shop/category/${category.slug}`}
                className={`flex flex-col items-center gap-2 p-5 text-center hover:bg-yellow-50 transition-colors border-b border-r border-gray-100 ${index >= 6 ? 'lg:border-b-0' : ''} ${(index + 1) % 2 === 0 ? 'md:border-r-0 lg:border-r' : ''} ${(index + 1) % 4 === 0 ? 'md:border-r-0 lg:border-r' : ''} last:border-r-0`}
              >
                <span className="text-3xl">{category.icon}</span>
                <span className="text-gray-800 text-sm font-medium">{category.name}</span>
                <span className="text-gray-400 text-xs">{category.count} products</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySidebar;