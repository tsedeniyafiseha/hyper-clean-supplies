import React from "react";

const brandsData = [
  { id: "ecolab", name: "ECOLAB" },
  { id: "clorox", name: "CLOROX" },
  { id: "lysol", name: "LYSOL" },
  { id: "mrclean", name: "MR. CLEAN" },
  { id: "swiffer", name: "SWIFFER" },
  { id: "dawn", name: "DAWN" },
];

const Brands = () => {
  return (
    <div className="bg-gray-50 py-8 border-y border-gray-100">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <p className="text-center text-sm text-gray-400 mb-6">Trusted brands we carry</p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {brandsData.map((brand) => (
            <span
              key={brand.id}
              className="text-gray-300 hover:text-yellow-500 font-bold text-lg md:text-xl tracking-wider transition-colors cursor-pointer"
            >
              {brand.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;