import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Star, Zap, Smartphone, Home, Coffee, Car, Play, Search } from 'lucide-react';
import { Product, Article } from '../types';

interface HomePageProps {
  onNavigate: (view: string, productId?: string) => void;
  products: Product[];
  onOpenAi: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, products, onOpenAi }) => {
  // Countdown Timer Logic
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 }; // Reset
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    { id: 'smart-home', name: 'Smart Home', icon: <Home size={24} />, color: 'bg-electric' },
    { id: 'kitchen', name: 'Smart Kitchen', icon: <Coffee size={24} />, color: 'bg-neo' },
    { id: 'mobile', name: 'Mobile Acc.', icon: <Smartphone size={24} />, color: 'bg-mint' },
    { id: 'car', name: 'Car Gadgets', icon: <Car size={24} />, color: 'bg-red-500' },
  ];

  const articles: Article[] = [
    { id: '1', title: 'إزاي الذكاء الاصطناعي هيغير بيتك في 2025؟', excerpt: 'تخيل بيتك بيفهمك من غير ما تتكلم..', image: 'https://images.unsplash.com/photo-1558002038-1091a1661116?w=500&q=80' },
    { id: '2', title: '٥ أجهزة لو عندك هتسهل يومك', excerpt: 'الحياة أسهل بكتير مع التكنولوجيا دي..', image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80' },
    { id: '3', title: 'Top 3 Smart Gadgets', excerpt: 'مش هتستغنى عنهم في مكتبك..', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&q=80' },
  ];

  const reels = [
    { id: 1, title: 'Unboxing VR Future', image: 'https://images.unsplash.com/photo-1622979135225-d2ba269fb1bd?w=400&q=80' },
    { id: 2, title: 'Smart Home Hacks', image: 'https://images.unsplash.com/photo-1558002038-1091a1661116?w=400&q=80' },
    { id: 3, title: 'Neo-Buds Review', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80' },
    { id: 4, title: 'Kitchen Setup', image: 'https://images.unsplash.com/photo-1595348020949-87cdfbb44174?w=400&q=80' },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient z-0" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay" />
        
        {/* Decorative Circles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-electric/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neo/20 rounded-full blur-[100px] animate-pulse delay-700"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-8xl font-tech font-black mb-6 leading-tight tracking-tight">
              مرحبًا في <span className="text-electric inline-block hover:scale-105 transition-transform">Oki-Store</span>
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-electric via-white to-neo mb-6">
              حيث يبدأ المستقبل الذكي في بيتك
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-300 mb-10 font-light flex items-center justify-center gap-4"
          >
             <span className="px-3 py-1 border border-white/10 rounded-full bg-black/30">Smart Home</span>
             <span className="px-3 py-1 border border-white/10 rounded-full bg-black/30">5G Lifestyle</span>
             <span className="px-3 py-1 border border-white/10 rounded-full bg-black/30">AI Gadgets</span>
          </motion.p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <motion.button 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-electric text-black px-10 py-5 rounded-full font-bold text-lg hover:bg-white transition-all shadow-[0_0_30px_rgba(0,240,255,0.4)] relative overflow-hidden group"
            >
              <span className="relative z-10">ابدأ التسوق الآن</span>
              <div className="absolute inset-0 bg-white/50 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </motion.button>
            
            <button 
                onClick={onOpenAi}
                className="flex items-center gap-2 px-8 py-5 rounded-full border border-white/20 hover:bg-white/5 transition-colors text-white"
            >
                <Search size={20} className="text-electric" />
                <span>اسأل الذكاء الاصطناعي</span>
            </button>
          </div>
        </div>
      </section>

      {/* Daily Deals Banner */}
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-neo via-[#2d1b4e] to-black rounded-3xl p-1 md:p-1"
        >
          <div className="bg-space-light/40 backdrop-blur-xl rounded-[22px] p-8 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-electric/10 rounded-full blur-3xl"></div>
             
             <div className="z-10 text-center md:text-right mb-6 md:mb-0">
               <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                 <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">HOT DEAL</span>
                 <span className="text-electric font-tech">LIMITED OFFER</span>
               </div>
               <h2 className="text-3xl font-bold mb-2 text-white">
                 عروض اليوم <Zap className="inline text-yellow-400 fill-current animate-pulse" />
               </h2>
               <p className="text-blue-200">خصومات تصل إلى <span className="text-electric font-bold text-xl">40%</span> على الأجهزة الذكية</p>
             </div>

             <div className="flex gap-4 z-10">
               {Object.entries(timeLeft).map(([unit, value]) => (
                 <div key={unit} className="bg-black/50 backdrop-blur-md rounded-xl p-4 min-w-[90px] text-center border border-white/10 shadow-lg">
                   <div className="text-4xl font-tech font-bold text-white mb-1">
                     {String(value).padStart(2, '0')}
                   </div>
                   <div className="text-[10px] text-gray-400 uppercase tracking-widest">{unit}</div>
                 </div>
               ))}
             </div>
          </div>
        </motion.div>
      </div>

      {/* Smart Categories */}
      <section className="container mx-auto px-4">
        <h3 className="text-2xl font-bold mb-8 border-r-4 border-electric pr-4 flex items-center gap-2">
            تسوق حسب القسم 
            <span className="text-xs font-normal text-gray-500 px-2 py-1 bg-white/5 rounded-full">AI Curated</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <motion.div 
              key={cat.id}
              whileHover={{ y: -5 }}
              className="glass-panel p-8 rounded-3xl flex flex-col items-center gap-4 cursor-pointer hover:border-electric/50 transition-all group relative overflow-hidden"
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-t ${cat.color} to-transparent transition-opacity`} />
              <div className={`p-5 rounded-full ${cat.color} bg-opacity-10 text-white group-hover:scale-110 group-hover:bg-opacity-20 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]`}>
                {cat.icon}
              </div>
              <span className="font-bold text-lg relative z-10">{cat.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section id="shop" className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
            <h3 className="text-2xl font-bold border-r-4 border-neo pr-4">أحدث المنتجات</h3>
            <button className="text-electric text-sm hover:underline">عرض الكل</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="glass-panel rounded-3xl overflow-hidden group hover:shadow-[0_0_40px_rgba(123,44,191,0.15)] transition-all flex flex-col border border-white/5 hover:border-electric/30"
            >
              <div className="relative h-72 overflow-hidden shrink-0 bg-space">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                {product.isNew && (
                  <span className="absolute top-4 right-4 bg-electric text-black text-[10px] font-bold px-3 py-1 rounded-full tracking-wider uppercase shadow-lg">
                    New Arrival
                  </span>
                )}
                {product.oldPrice && (
                    <span className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md">
                        SALE
                    </span>
                )}
                {/* Quick Action Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center">
                    <button 
                        onClick={() => onNavigate('PRODUCT', product.id)}
                        className="bg-white text-black text-sm font-bold py-2 px-6 rounded-full hover:bg-electric transition-colors"
                    >
                        نظرة سريعة
                    </button>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow relative">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-lg truncate w-full group-hover:text-electric transition-colors">{product.name}</h4>
                </div>
                
                <div className="flex items-center gap-1 text-yellow-400 text-xs mb-3">
                    <Star size={12} fill="currentColor" />
                    <span>{product.rating}</span>
                    <span className="text-gray-600 mx-1">•</span>
                    <span className="text-gray-500">Tech Verified</span>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed min-h-[40px]">
                  {product.shortDescription || product.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <div className="flex flex-col">
                    <span className="block text-xl font-tech font-bold text-white">{product.price.toLocaleString()} <span className="text-xs text-gray-500 font-sans">EGP</span></span>
                    {product.oldPrice && (
                      <span className="text-xs text-gray-500 line-through">{product.oldPrice.toLocaleString()} EGP</span>
                    )}
                  </div>
                  <button 
                    onClick={() => onNavigate('PRODUCT', product.id)}
                    className="bg-white/5 hover:bg-electric hover:text-black w-10 h-10 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Short Videos (Reels Style) */}
      <section className="container mx-auto px-4">
        <h3 className="text-2xl font-bold mb-8 border-r-4 border-white pr-4">فيديوهات Oki-Store</h3>
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
            {reels.map((reel) => (
                <div key={reel.id} className="min-w-[200px] h-[350px] rounded-2xl overflow-hidden relative group cursor-pointer border border-white/10">
                    <img src={reel.image} alt={reel.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                            <Play size={20} className="text-white fill-white ml-1" />
                        </div>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black to-transparent">
                        <p className="text-white font-bold text-sm">{reel.title}</p>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Short Articles */}
      <section className="container mx-auto px-4">
        <h3 className="text-2xl font-bold mb-8 border-r-4 border-mint pr-4">مدونة المستقبل</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article.id} className="glass-panel rounded-2xl overflow-hidden hover:border-mint/30 transition-all group">
              <div className="h-48 overflow-hidden">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-6">
                <h4 className="font-bold text-lg mb-2 group-hover:text-mint transition-colors">{article.title}</h4>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{article.excerpt}</p>
                <button className="text-mint text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                  اقرأ المقال <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* WhatsApp Floating Widget */}
      <a 
        href="https://wa.me/201234567890" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 left-6 z-40 bg-[#25D366] p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform flex items-center gap-3 group"
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6" />
        <span className="hidden md:block font-bold text-white group-hover:max-w-xs overflow-hidden whitespace-nowrap transition-all">اسأل Oki-Support</span>
      </a>
    </div>
  );
};