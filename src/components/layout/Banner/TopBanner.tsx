import React from "react";

const TopBanner = () => {
  return (
    <div className="bg-black text-white py-2 px-4 overflow-hidden">
      <div className="max-w-frame mx-auto">
        <div className="flex items-center justify-center gap-8 text-xs md:text-sm whitespace-nowrap animate-marquee">
          <span className="flex items-center gap-2">
            <span className="text-sky-400">⚡</span>
            Free Shipping over $299
          </span>
          <span className="text-gray-500">|</span>
          <span>Set Up a Business Account Today</span>
          <span className="text-gray-500">|</span>
          <span>Trusted by NZ&apos;s Leading Companies</span>
          <span className="text-gray-500">|</span>
          <span>Keep Your Workplace Safe & Spotless</span>
          <span className="text-gray-500">|</span>
          <span className="flex items-center gap-2">
            <span className="text-sky-400">⚡</span>
            Bulk Discounts for Business
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;