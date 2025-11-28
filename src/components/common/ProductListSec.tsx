import React from "react";
import * as motion from "framer-motion/client";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product.types";
import Link from "next/link";

type ProductListSecProps = {
  title: string;
  data: Product[];
  viewAllLink?: string;
};

const ProductListSec = ({ title, data, viewAllLink }: ProductListSecProps) => {
  return (
    <section className="w-full">
      <motion.h2
        initial={{ y: "30px", opacity: 0 }}
        whileInView={{ y: "0", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={cn([integralCF.className, "text-2xl md:text-3xl mb-6 text-black font-bold"])}
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ y: "30px", opacity: 0 }}
        whileInView={{ y: "0", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {/* 4 Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {data.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
        {viewAllLink && (
          <div className="text-center">
            <Link
              href={viewAllLink}
              className="inline-block px-8 py-3 border-2 rounded-full bg-sky-500 hover:bg-sky-600 text-white transition-all font-bold text-sm border-sky-500"
            >
              View All Products
            </Link>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default ProductListSec;