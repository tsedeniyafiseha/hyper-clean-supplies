import Link from "next/link";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

type Category = {
  title: string;
  slug: string;
};

const categoriesData: Category[] = [
  {
    title: "Cleaning Chemicals",
    slug: "/shop?category=cleaning-chemicals",
  },
  {
    title: "Bathroom Care",
    slug: "/shop?category=bathroom-care",
  },
  {
    title: "Kitchen Care",
    slug: "/shop?category=kitchen-care",
  },
  {
    title: "Floor Care",
    slug: "/shop?category=floor-care",
  },
  {
    title: "Window Care",
    slug: "/shop?category=window-care",
  },
  {
    title: "Dispensers",
    slug: "/shop?category=dispensers",
  },
  {
    title: "Gloves",
    slug: "/shop?category=gloves",
  },
  {
    title: "Paper Products",
    slug: "/shop?category=paper-products",
  },
];

const CategoriesSection = () => {
  return (
    <div className="flex flex-col space-y-0.5 text-black/60">
      {categoriesData.map((category, idx) => (
        <Link
          key={idx}
          href={category.slug}
          className="flex items-center justify-between py-2"
        >
          {category.title} <MdKeyboardArrowRight />
        </Link>
      ))}
    </div>
  );
};

export default CategoriesSection;
