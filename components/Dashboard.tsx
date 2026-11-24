import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Sparkles, Save, LayoutDashboard, Users, ShoppingBag } from 'lucide-react';
import { generateArticleContent } from '../services/gemini';

const data = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 2000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
];

export const Dashboard: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [generatedArticle, setGeneratedArticle] = useState<{title: string, content: string} | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;
    setIsGenerating(true);
    const result = await generateArticleContent(topic);
    setGeneratedArticle(result);
    setIsGenerating(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-tech font-bold mb-8 flex items-center gap-3">
        <LayoutDashboard className="text-neo" /> لوحة التحكم
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-electric">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-400 text-sm">إجمالي المبيعات</p>
              <h3 className="text-3xl font-bold">45,200 EGP</h3>
            </div>
            <div className="bg-electric/20 p-2 rounded-lg text-electric">
              <ShoppingBag size={24} />
            </div>
          </div>
          <span className="text-green-400 text-sm">+12% عن الشهر الماضي</span>
        </div>

        <div className="glass-panel p-6 rounded-2xl border-l-4 border-neo">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-400 text-sm">المستخدمين النشطين</p>
              <h3 className="text-3xl font-bold">1,240</h3>
            </div>
            <div className="bg-neo/20 p-2 rounded-lg text-neo">
              <Users size={24} />
            </div>
          </div>
          <span className="text-green-400 text-sm">+5% هذا الأسبوع</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Sales Chart */}
        <div className="glass-panel p-6 rounded-2xl">
            <h3 className="font-bold mb-6">تحليل المبيعات</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#12121A', borderColor: '#333', color: '#fff' }}
                    itemStyle={{ color: '#00F0FF' }}
                  />
                  <Bar dataKey="sales" fill="#7B2CBF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
        </div>

        {/* AI Article Generator */}
        <div className="glass-panel p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-gradient-to-r from-neo to-electric p-2 rounded-lg">
                <Sparkles size={20} className="text-white" />
            </div>
            <h3 className="font-bold text-lg">محرر المقالات الذكي (AI)</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">موضوع المقال</label>
              <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="مثلاً: أفضل سماعات بلوتوث في 2024"
                className="w-full bg-black/20 border border-white/10 rounded-xl p-3 focus:border-electric outline-none transition-colors"
              />
            </div>
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-white/10 hover:bg-electric hover:text-black font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <span className="animate-pulse">جاري الكتابة...</span>
              ) : (
                <>
                  <Sparkles size={18} /> توليد المقال
                </>
              )}
            </button>
          </div>

          {generatedArticle && (
            <div className="mt-6 p-4 bg-black/20 rounded-xl border border-white/5 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-electric">{generatedArticle.title}</h4>
                <button className="text-gray-400 hover:text-white"><Save size={18} /></button>
              </div>
              <p className="text-gray-300 text-sm whitespace-pre-line leading-relaxed">
                {generatedArticle.content}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};