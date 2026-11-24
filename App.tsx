import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import { ProductPage } from './components/ProductPage';
import { Dashboard } from './components/Dashboard';
import { GeminiAssistant } from './components/GeminiAssistant';
import { Product, ViewState, Coupon } from './types';
import { X, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data with Short Descriptions
const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Smart Echo Dot 5 - Future Edition',
    price: 2499,
    oldPrice: 3200,
    category: 'Smart Home',
    image: 'https://images.unsplash.com/photo-1543512214-318c77a07293?w=800&q=80',
    rating: 4.8,
    description: 'تحكم في بيتك بالكامل بصوتك. مساعد ذكي متطور بتصميم مستقبلي يدعم اللغة العربية. يتميز بصوت نقي وعالي الجودة مع إمكانية ربطه بجميع الأجهزة الذكية الأخرى في المنزل.',
    shortDescription: 'مساعد ذكي يتحكم في منزلك بصوتك، يدعم العربية بتصميم مستقبلي.',
    features: ['Voice Control', 'Smart Home Hub', 'High Quality Sound'],
    isNew: true
  },
  {
    id: 'p2',
    name: 'Neo-Buds Pro Noise Cancelling',
    price: 3500,
    category: 'Mobile Accessories',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
    rating: 4.9,
    description: 'عزل ضوضاء كامل وتصميم مريح للأذن مع بطارية تدوم 24 ساعة. مثالية للألعاب والمكالمات بصوت واضح ونقي جداً مع تقنية البلوتوث الحديثة.',
    shortDescription: 'سماعات عزل ضوضاء احترافية مع بطارية 24 ساعة وتصميم مريح.',
    features: ['Active Noise Cancellation', '30h Battery', 'Wireless Charging']
  },
  {
    id: 'p3',
    name: 'Smart Kitchen Scale & Nutrition Analyzer',
    price: 1200,
    oldPrice: 1500,
    category: 'Smart Kitchen',
    image: 'https://images.unsplash.com/photo-1595348020949-87cdfbb44174?w=800&q=80',
    rating: 4.5,
    description: 'مش بس ميزان، ده بيحسب السعرات الحرارية ويربط بموبايلك عشان تتابع نظامك الغذائي بدقة. سهل التنظيف ومصنوع من مواد عالية الجودة.',
    shortDescription: 'ميزان ذكي يحسب السعرات الحرارية ويرتبط بتطبيق هاتفك لمتابعة دقيقة.',
    features: ['App Connected', 'Calorie Counter', 'Precision Sensors']
  },
  {
    id: 'p4',
    name: 'VR Headset Future Vision',
    price: 8999,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269fb1bd?w=800&q=80',
    rating: 5.0,
    description: 'عيش المستقبل النهاردة. نظارة واقع افتراضي بدقة 4K وتجربة غامرة 360 درجة. متوافقة مع الكمبيوتر وأجهزة الكونسول.',
    shortDescription: 'نظارة واقع افتراضي 4K لتجربة ألعاب وتطبيقات غامرة بوضوح مذهل.',
    features: ['4K Display', '120Hz Refresh Rate', 'Lightweight']
  }
];

export default function App() {
  const [view, setView] = useState<ViewState>('HOME');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [showCoupon, setShowCoupon] = useState(false);
  const [hasSeenCoupon, setHasSeenCoupon] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  useEffect(() => {
    // Show coupon after 2 seconds for first time visitors
    if (!hasSeenCoupon) {
      const timer = setTimeout(() => {
        setShowCoupon(true);
        setHasSeenCoupon(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [hasSeenCoupon]);

  const handleNavigate = (targetView: string, productId?: string) => {
    if (targetView === 'PRODUCT' && productId) {
      const product = MOCK_PRODUCTS.find(p => p.id === productId);
      if (product) {
        setSelectedProduct(product);
        setView('PRODUCT');
      }
    } else {
      setView(targetView as ViewState);
    }
    window.scrollTo(0, 0);
  };

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <Layout cartCount={cartCount} onNavigate={handleNavigate} currentView={view}>
      <AnimatePresence mode='wait'>
        {view === 'HOME' && (
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} key="home">
            <HomePage onNavigate={handleNavigate} products={MOCK_PRODUCTS} onOpenAi={() => setIsAiChatOpen(true)} />
          </motion.div>
        )}
        {view === 'PRODUCT' && selectedProduct && (
           <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} key="product">
             <ProductPage product={selectedProduct} onBack={() => setView('HOME')} onAddToCart={handleAddToCart} />
           </motion.div>
        )}
        {view === 'DASHBOARD' && (
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} key="dashboard">
              <Dashboard />
            </motion.div>
        )}
        {view === 'CART' && (
          <div className="container mx-auto px-4 py-20 text-center">
            <h2 className="text-3xl font-bold mb-4">عربة التسوق</h2>
            <p className="text-gray-400">قريباً...</p>
            <button onClick={() => setView('HOME')} className="mt-4 text-electric hover:underline">العودة للتسوق</button>
          </div>
        )}
      </AnimatePresence>
      
      {/* AI Assistant triggered from button or fab */}
      {/* We pass the state control to the component if needed, or just let it handle itself, 
          but here we want to allow opening it from the Home Search button */}
      <div className={isAiChatOpen ? "block" : ""}>
        <GeminiAssistant forceOpen={isAiChatOpen} onClose={() => setIsAiChatOpen(false)} />
      </div>

      {/* Coupon Modal */}
      <AnimatePresence>
        {showCoupon && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-space-light border border-electric/50 p-8 rounded-3xl max-w-md w-full relative overflow-hidden text-center shadow-[0_0_50px_rgba(0,240,255,0.2)]"
            >
              <button 
                onClick={() => setShowCoupon(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
              
              <div className="mb-6 flex justify-center">
                <div className="bg-electric/20 p-4 rounded-full relative">
                    <div className="absolute inset-0 bg-electric/30 blur-xl rounded-full animate-pulse"></div>
                  <Gift size={48} className="text-electric animate-bounce relative z-10" />
                </div>
              </div>
              
              <h2 className="text-3xl font-bold mb-2 text-white">مبروك! 🎉</h2>
              <p className="text-gray-300 mb-6">سجّل الآن وخد 100 جنيه هدية من Oki-Store</p>
              
              <div className="bg-white/5 border border-dashed border-electric/50 p-4 rounded-xl mb-6">
                <span className="text-2xl font-tech font-bold text-electric tracking-widest">OKI-NEW-100</span>
                <p className="text-xs text-gray-500 mt-2">صالحة لمدة 24 ساعة فقط</p>
              </div>
              
              <button 
                onClick={() => setShowCoupon(false)}
                className="w-full bg-electric text-black font-bold py-3 rounded-xl hover:bg-white transition-colors"
              >
                استخدم الكوبون الآن
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
}