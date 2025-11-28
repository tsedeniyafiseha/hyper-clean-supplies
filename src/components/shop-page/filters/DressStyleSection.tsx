import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

type ProductType = {
  title: string;
  slug: string;
};

const productTypesData: ProductType[] = [
  {
    title: "Eco-Friendly",
    slug: "/shop?type=eco-friendly",
  },
  {
    title: "Industrial Strength",
    slug: "/shop?type=industrial",
  },
  {
    title: "Concentrated",
    slug: "/shop?type=concentrated",
  },
  {
    title: "Disinfectant",
    slug: "/shop?type=disinfectant",
  },
];

const DressStyleSection = () => {
  return (
    <Accordion type="single" collapsible defaultValue="filter-style">
      <AccordionItem value="filter-style" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Product Type
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex flex-col text-black/60 space-y-0.5">
            {productTypesData.map((pType, idx) => (
              <Link
                key={idx}
                href={pType.slug}
                className="flex items-center justify-between py-2"
              >
                {pType.title} <MdKeyboardArrowRight />
              </Link>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DressStyleSection;
