
import React from 'react';
import { HardHat, Building2, ShieldCheck, Zap, Users, ArrowLeft } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 md:pt-32 md:pb-32 bg-gradient-to-br from-orange-50 to-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full -mr-48 -mt-24 blur-3xl opacity-50"></div>
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-bold mb-8 animate-bounce">
            <ShieldCheck size={18} />
            اول شبكة مقاولات اجتماعية في الإمارات
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 leading-tight">
            مقاول <span className="text-orange-600">بلس</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 font-medium max-w-2xl mx-auto">
            نربط المقاولين نبني المجتمعات. بوابتك الذكية لتنفيذ وإدارة المشاريع الإنشائية بكفاءة.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button 
              onClick={onStart}
              className="w-full md:w-auto bg-orange-600 text-white text-lg font-bold px-12 py-5 rounded-2xl shadow-xl shadow-orange-200 hover:bg-orange-700 hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              ابدأ الآن مجاناً
              <ArrowLeft size={20} />
            </button>
            <button className="w-full md:w-auto bg-white border border-gray-200 text-gray-700 text-lg font-bold px-12 py-5 rounded-2xl hover:bg-gray-50 transition-all">
              اكتشف المزيد
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-600 mb-1">1000+</p>
            <p className="text-sm text-gray-500 font-medium">مشروع نشط</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-600 mb-1">500+</p>
            <p className="text-sm text-gray-500 font-medium">شركة مقاولات</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-600 mb-1">98%</p>
            <p className="text-sm text-gray-500 font-medium">نسبة الرضا</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-600 mb-1">24/7</p>
            <p className="text-sm text-gray-500 font-medium">دعم فني</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">خدمات متكاملة لكل الأطراف</h2>
          <p className="text-gray-500 max-w-xl mx-auto font-medium">نقدم حلولاً ذكية تضمن سلاسة العمل من طرح المناقصة وحتى تسليم المشروع.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Main Contractor Box */}
          <div className="bg-orange-50 p-10 rounded-[2.5rem] border border-orange-100 group hover:shadow-2xl hover:shadow-orange-100 transition-all duration-500">
            <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-6 transition-transform">
              <Building2 size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">للمقاول الرئيسي</h3>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start gap-3">
                <Zap size={18} className="text-orange-600 mt-1 flex-shrink-0" />
                <span>طرح المشاريع والوصول لآلاف مقاولي الباطن في ثوانٍ.</span>
              </li>
              <li className="flex items-start gap-3">
                <Zap size={18} className="text-orange-600 mt-1 flex-shrink-0" />
                <span>إدارة العطاءات وتحليلها باستخدام الذكاء الاصطناعي.</span>
              </li>
              <li className="flex items-start gap-3">
                <Zap size={18} className="text-orange-600 mt-1 flex-shrink-0" />
                <span>نظام تقييم موثق لضمان جودة التنفيذ والالتزام.</span>
              </li>
            </ul>
          </div>

          {/* Sub Contractor Box */}
          <div className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-200 group hover:shadow-2xl hover:shadow-gray-100 transition-all duration-500">
            <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-6 transition-transform">
              <HardHat size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4">لمقاول الباطن</h3>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start gap-3">
                <Zap size={18} className="text-gray-800 mt-1 flex-shrink-0" />
                <span>استعراض مئات الفرص الاستثمارية يومياً في منطقتك.</span>
              </li>
              <li className="flex items-start gap-3">
                <Zap size={18} className="text-gray-800 mt-1 flex-shrink-0" />
                <span>نظام تقديم احترافي يبرز خبراتك وسجلك التجاري.</span>
              </li>
              <li className="flex items-start gap-3">
                <Zap size={18} className="text-gray-800 mt-1 flex-shrink-0" />
                <span>فرص للنمو والتعاقد مع كبرى شركات الإنشاءات.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-orange-600 rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-2xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">هل أنت جاهز للارتقاء بأعمالك؟</h2>
            <p className="text-orange-100 text-lg mb-10 max-w-xl mx-auto">انضم إلى مجتمع مقاول بلس اليوم وابدأ في بناء مستقبلك معنا.</p>
            <button 
              onClick={onStart}
              className="bg-white text-orange-600 text-xl font-bold px-12 py-5 rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              ابدأ رحلتك الآن
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 px-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4 text-orange-600 font-bold text-2xl">
            <Building2 />
            مقاول بلس
          </div>
          <p className="text-gray-500 text-sm mb-6">جميع الحقوق محفوظة © 2024 - مقاول بلس | نربط المقاولين نبني المجتمعات</p>
          <div className="flex justify-center gap-6 text-gray-400 text-sm font-medium">
            <a href="#" className="hover:text-orange-600 transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-orange-600 transition-colors">شروط الاستخدام</a>
            <a href="#" className="hover:text-orange-600 transition-colors">اتصل بنا</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
