import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import { Experience, Contact } from "../components/ExperienceContact";
import { productsAPI } from "../utils/api";
import { useCart } from "../context/CartContext";

function ShopPreview() {
  const [products, setProducts] = useState([]);
  const { addItem } = useCart();

  useEffect(() => {
    productsAPI
      .getAll({ featured: true, limit: 3 })
      .then((r) => setProducts(r.products))
      .catch(() => {});
  }, []);

  if (!products.length) return null;

  return (
    <section className="py-24 bg-surface/30">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="section-tag">
              <ShoppingBag size={12} /> Tech Shop
            </span>
            <h2 className="section-title">Curated gear picks</h2>
          </div>
          <Link
            to="/shop"
            className="hidden md:flex items-center gap-2 text-accent text-sm hover:underline"
          >
            Browse all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((p) => (
            <motion.div
              key={p._id}
              whileHover={{ y: -4 }}
              className="product-card card-glass flex flex-col overflow-hidden"
            >
              <Link to={`/shop/${p._id}`}>
                <div className="h-48 bg-bg rounded-lg overflow-hidden mb-4 border border-border flex items-center justify-center">
                  {p.images?.[0]?.url ? (
                    <img
                      src={p.images[0].url}
                      alt={p.name}
                      className="product-img w-full h-full object-cover"
                    />
                  ) : (
                    <ShoppingBag size={40} className="text-muted" />
                  )}
                </div>
              </Link>
              <div className="flex-1 flex flex-col">
                <p className="text-xs text-accent font-mono mb-1 capitalize">
                  {p.category}
                </p>
                <h3 className="font-semibold text-text mb-2 line-clamp-1">
                  {p.name}
                </h3>
                <p className="text-text-dim text-xs mb-4 line-clamp-2 flex-1">
                  {p.shortDescription}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    {p.productType === "affiliate" ? (
                      <Link
                        to={`/shop/${p._id}`}
                        className="font-display font-bold text-accent hover:underline"
                      >
                        View Deal
                      </Link>
                    ) : (
                      <span className="font-display font-bold text-accent">
                        ₹{p.price?.toLocaleString()}
                      </span>
                    )}
                    {p.comparePrice && p.productType !== "affiliate" && (
                      <span className="text-muted text-xs line-through ml-2">
                        ₹{p.comparePrice?.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => addItem(p)}
                    className="text-xs px-3 py-1.5 bg-accent/10 text-accent border border-accent/20 rounded-lg hover:bg-accent hover:text-bg transition-all"
                  >
                    {p.productType === "affiliate"
                      ? "Buy Now →"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link to="/shop" className="btn-outline">
            Browse all products <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <ShopPreview />
      <Experience />
      <Contact />
    </main>
  );
}
