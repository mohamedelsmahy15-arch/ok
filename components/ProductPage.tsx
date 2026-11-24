import React from 'react';
import { Product } from '../types';
import { Star, ShieldCheck, Truck, ArrowLeft, ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ product, onBack, onAddToCart }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft size={20} /> العودة للمتجر
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image Gallery */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="aspect-square rounded-3xl overflow-hidden glass-panel border-0 relative group">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
              <span className="text-white font-tech text-xl">Future Tech View</span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
             {/* Mock thumbnails */}
             {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden glass-panel cursor-pointer hover:border-electric transition-colors">
                  <img src={product.image} alt="thumbnail" className="w-full h-full object-cover opacity-70 hover:opacity-100" />
                </div>
             ))}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col h-full"
        >
          <div className="mb-2">
            <span className="text-electric text-sm font-bold tracking-wider uppercase">{product.category}</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 font-tech">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex text-yellow-400">
               {[...Array(5)].map((_, i) => (
                 <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
               ))}
            </div>
            <span className="text-gray-400 text-sm">(124 reviews)</span>
          </div>

          <div className="text-3xl font-bold text-white mb-8 flex items-end gap-3">
            {product.price.toLocaleString()} EGP
            {product.oldPrice && (
              <span className="text-lg text-gray-500 line-through mb-1">{product.oldPrice.toLocaleString()} EGP</span>
            )}
          </div>

          <div className="glass-panel p-6 rounded-xl mb-8">
            <h3 className="font-bold mb-3 text-lg">الوصف</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              {product.description}
            </p>
            {product.features && (
              <ul className="space-y-2">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="w-1.5 h-1.5 bg-electric rounded-full"></span>
                    {feat}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => onAddToCart(product)}
              className="flex-1 bg-electric text-black font-bold py-4 rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.2)]"
            >
              <ShoppingCart size={20} /> أضف للسلة
            </button>
            <button className="bg-white/5 text-white p-4 rounded-xl hover:bg-white/10 transition-colors">
              <Heart size={24} />
            </button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-2 gap-4 mt-auto">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
              <Truck className="text-electric" size={24} />
              <div>
                <div className="font-bold text-sm">شحن سريع</div>
                <div className="text-xs text-gray-400">خلال 2-4 أيام</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
              <ShieldCheck className="text-mint" size={24} />
              <div>
                <div className="font-bold text-sm">ضمان استرجاع</div>
                <div className="text-xs text-gray-400">30 يوم ضمان</div>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
};