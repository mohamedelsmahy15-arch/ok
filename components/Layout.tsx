import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Smartphone, Home, Zap, User, Search, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  cartCount: number;
  onNavigate: (view: string) => void;
  currentView: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, cartCount, onNavigate, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans text-right">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-space-light/90 backdrop-blur-lg border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
            
          {/* Logo */}
          <div 
            className="text-2xl font-tech font-bold text-white cursor-pointer flex items-center gap-2"
            onClick={() => onNavigate('HOME')}
          >
            <span className="text-electric animate-pulse">Oki</span>-Store
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <button onClick={() => onNavigate('HOME')} className="hover:text-electric transition-colors">الرئيسية</button>
            <a href="#shop" className="hover:text-electric transition-colors">المتجر</a>
            <a href="#about" className="hover:text-electric transition-colors">عن البراند</a>
            <button onClick={() => onNavigate('DASHBOARD')} className="hover:text-electric transition-colors">Dashboard</button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer hover:text-electric transition-colors" onClick={() => onNavigate('CART')}>
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-electric text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-space-light border-b border-white/10 overflow-hidden"
            >
              <div className="flex flex-col p-4 gap-4 text-center">
                 <button onClick={() => { onNavigate('HOME'); setIsMobileMenuOpen(false); }}>الرئيسية</button>
                 <button onClick={() => { onNavigate('DASHBOARD'); setIsMobileMenuOpen(false); }}>لوحة التحكم</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-space-light border-t border-white/5 pt-16 pb-8 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-tech text-2xl font-bold mb-4 text-white">Oki-Store</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                وجهتك الأولى للمستقبل. نوفر أحدث أجهزة Smart Home وحلول المعيشة الذكية في مصر.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-electric mb-4">روابط سريعة</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:text-white cursor-pointer">المتجر</li>
                <li className="hover:text-white cursor-pointer">تتبع طلبك</li>
                <li className="hover:text-white cursor-pointer">سياسة الاسترجاع</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-electric mb-4">تواصل معنا</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>support@oki-store.com</li>
                <li>+20 123 456 7890</li>
                <li>Cairo, Egypt</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-electric mb-4">اشترك في النشرة</h4>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="بريدك الإلكتروني" 
                  className="bg-space border border-white/10 px-4 py-2 rounded-lg w-full text-sm focus:border-electric outline-none"
                />
                <button className="bg-electric text-black px-4 py-2 rounded-lg font-bold hover:bg-white transition-colors">
                  <Zap size={18} />
                </button>
              </div>
            </div>
          </div>
          <div className="text-center text-gray-600 text-sm border-t border-white/5 pt-8">
            © 2024 Oki-Store. All rights reserved. Future Ready.
          </div>
        </div>
      </footer>
    </div>
  );
};