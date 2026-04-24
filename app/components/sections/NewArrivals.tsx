"use client";

import { useState, useCallback } from "react";
import ProductDrawer, { type Product } from "@/app/components/ui/ProductDrawer";

const products: Product[] = [
  { name: "Racing Club Home 26/27",    price: "L 14.50", href: "/producto/racing-home-2627" },
  { name: "Arabia Saudita Away 26/27", price: "L 14.50", href: "/producto/arabia-away-2627" },
  { name: "Bragantino Home 26/27",     price: "L 14.50", href: "/producto/bragantino-home-2627" },
  { name: "España Away 26/27",         price: "L 14.50", href: "/producto/espana-away-2627" },
  { name: "Boca Juniors Third 26/27",  price: "L 14.50", href: "/producto/boca-third-2627" },
];

function ImagePlaceholder() {
  return (
    <div className="w-full aspect-[3/4] bg-bg-elevated flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 80 80"
        className="w-1/2 h-1/2"
        aria-hidden="true"
      >
        <rect x="6" y="14" width="68" height="52" rx="6" fill="none" stroke="#3D4F4D" strokeWidth="3" />
        <circle cx="24" cy="30" r="6" fill="#3D4F4D" />
        <path d="M6 52 L26 34 L42 50 L54 38 L74 54" fill="none" stroke="#3D4F4D" strokeWidth="3" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function NewArrivals() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const closeDrawer = useCallback(() => setSelectedProduct(null), []);

  return (
    <>
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <span className="flex-1 h-px bg-border" />
            <h2 className="text-fg-primary text-2xl tracking-widest uppercase whitespace-nowrap">
              Nuevas Equipaciones
            </h2>
            <span className="flex-1 h-px bg-border" />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <button
                key={product.href}
                onClick={() => setSelectedProduct(product)}
                className="group flex flex-col text-left"
              >
                {/* Image */}
                <div className="relative overflow-hidden rounded-lg w-full">
                  <ImagePlaceholder />
                  <span className="absolute top-2 left-2 bg-accent text-bg-base text-xs font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                    Nuevo
                  </span>
                </div>

                {/* Info */}
                <div className="mt-3 flex flex-col gap-1 px-1">
                  <p className="text-fg-secondary group-hover:text-fg-primary text-xs tracking-wide leading-snug transition-colors duration-150 line-clamp-2">
                    {product.name}
                  </p>
                  <p className="text-fg-primary text-sm tracking-wider">
                    {product.price}
                  </p>
                </div>
              </button>
            ))}
          </div>

        </div>
      </section>

      <ProductDrawer product={selectedProduct} onClose={closeDrawer} />
    </>
  );
}
