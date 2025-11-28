"use client";

import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Slider } from "@/components/ui/slider";

const categories = [
  { title: "Cleaning Chemicals", slug: "cleaning-chemicals", count: 24 },
  { title: "Bathroom Care", slug: "bathroom-care", count: 18 },
  { title: "Kitchen Care", slug: "kitchen-care", count: 15 },
  { title: "Floor Care", slug: "floor-care", count: 12 },
  { title: "Dispensers", slug: "dispensers", count: 10 },
  { title: "Gloves & PPE", slug: "gloves", count: 22 },
  { title: "Paper Products", slug: "paper-products", count: 14 },
];

const brands = [
  { name: "Ecolab", count: 15 },
  { name: "Clorox", count: 12 },
  { name: "Lysol", count: 18 },
  { name: "Mr. Clean", count: 8 },
];

type FilterSectionProps = {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
};

const FilterSection = ({ title, defaultOpen = true, children }: FilterSectionProps) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="font-semibold text-black">{title}</span>
        {isOpen ? (
          <MdKeyboardArrowUp className="text-xl text-gray-400" />
        ) : (
          <MdKeyboardArrowDown className="text-xl text-gray-400" />
        )}
      </button>
      {isOpen && <div className="mt-3">{children}</div>}
    </div>
  );
};

const Filters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 300]);
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);

  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  const handleBrandToggle = (brandName: string) => {
    setSelectedBrands(prev => 
      prev.includes(brandName) 
        ? prev.filter(b => b !== brandName)
        : [...prev, brandName]
    );
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Add price filters
    if (priceRange[0] > 0) params.set('minPrice', priceRange[0].toString());
    if (priceRange[1] < 300) params.set('maxPrice', priceRange[1].toString());
    
    // Add brand filters
    if (selectedBrands.length > 0) {
      params.set('brands', selectedBrands.join(','));
    } else {
      params.delete('brands');
    }
    
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="space-y-0">
      <FilterSection title="Price">
        <Slider 
          defaultValue={[0, 300]} 
          min={0} 
          max={300} 
          step={5} 
          label="$"
          onValueChange={handlePriceChange}
        />
        <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
          <span>$0</span>
          <span>$300+</span>
        </div>
      </FilterSection>

      <FilterSection title="Brand">
        <div className="space-y-2">
          {brands.map((brand, idx) => (
            <label key={idx} className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={selectedBrands.includes(brand.name)}
                onChange={() => handleBrandToggle(brand.name)}
                className="w-4 h-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500" 
              />
              <span className="text-sm text-gray-600 group-hover:text-black">{brand.name}</span>
              <span className="text-xs text-gray-400 ml-auto">({brand.count})</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Product Category">
        <div className="space-y-1">
          {categories.map((category, idx) => (
            <Link key={idx} href={`/shop/category/${category.slug}`} className="flex items-center justify-between py-1.5 text-sm text-gray-600 hover:text-black">
              <span>{category.title}</span>
              <span className="text-xs text-gray-400">({category.count})</span>
            </Link>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Availability" defaultOpen={false}>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500" />
            <span className="text-sm text-gray-600 group-hover:text-black">In Stock Only</span>
          </label>
        </div>
      </FilterSection>

      <div className="pt-4">
        <button 
          type="button" 
          onClick={applyFilters}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black rounded-md py-3 text-sm font-semibold transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;