"use client";

import { useState, useEffect } from "react";

export type Product = {
  name: string;
  price: string;
  href: string;
};

type Props = {
  product: Product | null;
  onClose: () => void;
};

const SIZES = ["S", "M", "L", "XL", "XXL"] as const;
const PHOTO_COUNT = 4;

function PlaceholderPhoto() {
  return (
    <div className="w-full aspect-[3/4] bg-bg-elevated flex items-center justify-center rounded-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 80 80"
        className="w-1/3 h-1/3"
        aria-hidden="true"
      >
        <rect x="6" y="14" width="68" height="52" rx="6" fill="none" stroke="#3D4F4D" strokeWidth="3" />
        <circle cx="24" cy="30" r="6" fill="#3D4F4D" />
        <path d="M6 52 L26 34 L42 50 L54 38 L74 54" fill="none" stroke="#3D4F4D" strokeWidth="3" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function ProductDrawer({ product, onClose }: Props) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const isOpen = product !== null;

  // Reset state when a new product opens
  useEffect(() => {
    if (product) {
      setPhotoIndex(0);
      setSelectedSize(null);
    }
  }, [product]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const prev = () => setPhotoIndex((i) => (i - 1 + PHOTO_COUNT) % PHOTO_COUNT);
  const next = () => setPhotoIndex((i) => (i + 1) % PHOTO_COUNT);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Detalle del producto"
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md bg-bg-surface border-l border-border flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <p className="text-fg-muted text-xs tracking-widest uppercase">Detalle del Producto</p>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="text-fg-secondary hover:text-fg-primary transition-colors duration-150 p-1"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-6">

          {/* Carousel */}
          <div className="relative">
            <PlaceholderPhoto />

            {/* Arrows */}
            <button
              onClick={prev}
              aria-label="Foto anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-bg-base/70 hover:bg-bg-base text-fg-primary p-1.5 rounded-full transition-colors duration-150"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={next}
              aria-label="Foto siguiente"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-bg-base/70 hover:bg-bg-base text-fg-primary p-1.5 rounded-full transition-colors duration-150"
            >
              <ChevronRight />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {Array.from({ length: PHOTO_COUNT }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPhotoIndex(i)}
                  aria-label={`Foto ${i + 1}`}
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-150 ${
                    i === photoIndex ? "bg-accent" : "bg-fg-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2">
            {Array.from({ length: PHOTO_COUNT }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPhotoIndex(i)}
                className={`w-16 aspect-[3/4] rounded-md overflow-hidden border-2 transition-colors duration-150 ${
                  i === photoIndex ? "border-accent" : "border-border hover:border-border-strong"
                }`}
              >
                <div className="w-full h-full bg-bg-elevated flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" className="w-2/3 h-2/3" aria-hidden="true">
                    <rect x="6" y="14" width="68" height="52" rx="6" fill="none" stroke="#3D4F4D" strokeWidth="3" />
                    <circle cx="24" cy="30" r="6" fill="#3D4F4D" />
                    <path d="M6 52 L26 34 L42 50 L54 38 L74 54" fill="none" stroke="#3D4F4D" strokeWidth="3" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
            ))}
          </div>

          {/* Product info */}
          <div className="flex flex-col gap-1">
            <h2 className="text-fg-primary text-lg tracking-wide uppercase leading-snug">
              {product?.name}
            </h2>
            <p className="text-accent text-xl tracking-wider">
              {product?.price}
            </p>
          </div>

          {/* Size selector */}
          <div className="flex flex-col gap-3">
            <p className="text-fg-secondary text-xs tracking-widest uppercase">
              Talla {selectedSize && <span className="text-fg-primary">— {selectedSize}</span>}
            </p>
            <div className="flex gap-2 flex-wrap">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-10 rounded-md border text-sm tracking-widest uppercase transition-colors duration-150 ${
                    selectedSize === size
                      ? "border-accent text-accent bg-accent-muted"
                      : "border-border text-fg-secondary hover:border-border-strong hover:text-fg-primary"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2 border-t border-border pt-5">
            <p className="text-fg-secondary text-xs tracking-widest uppercase">Descripción</p>
            <p className="text-fg-muted text-sm leading-relaxed">
              Equipación oficial de temporada 26/27. Tejido técnico de alta transpirabilidad, corte regular y escudo bordado. Disponible en tallas S a XXL.
            </p>
          </div>

        </div>

        {/* Footer — CTA */}
        <div className="px-5 py-4 border-t border-border shrink-0">
          <button
            disabled={!selectedSize}
            className="w-full py-3 rounded-lg bg-accent text-bg-base text-sm tracking-widest uppercase font-bold transition-opacity duration-150 disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:bg-accent-hover"
          >
            {selectedSize ? "Agregar al Carrito" : "Seleccioná una Talla"}
          </button>
        </div>
      </aside>
    </>
  );
}
