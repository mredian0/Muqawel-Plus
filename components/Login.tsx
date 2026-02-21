
import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { HardHat, Building2, Mail, Lock, User as UserIcon, ChevronLeft } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
  onBack: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onBack }) => {
  const [role, setRole] = useState<UserRole>(UserRole.MAIN_CONTRACTOR);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      id: Math.random().toString(36).substr(2, 9),
      name: name || (role === UserRole.MAIN_CONTRACTOR ? 'شركة الإعمار' : 'مؤسسة السباكة الفنية'),
      email: email || 'user@example.com',
      role
    });
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-4 px-2">
        <button onClick={onBack} className="flex items-center gap-1 text-orange-600 font-bold text-sm hover:translate-x-1 transition-transform">
          <ChevronLeft size={20} />
          العودة للرئيسية
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-orange-600 p-8 text-white text-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4">
            <HardHat size={32} />
          </div>
          <h1 className="text-3xl font-bold">مقاول بلس</h1>
          <p className="opacity-90 mt-2 font-medium">نربط المقاولين نبني المجتمعات</p>
        </div>

        <div className="p-8">
          <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
            <button
              onClick={() => setRole(UserRole.MAIN_CONTRACTOR)}
              className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all ${
                role === UserRole.MAIN_CONTRACTOR ? 'bg-white shadow text-orange-600' : 'text-gray-500'
              }`}
            >
              <Building2 size={18} />
              مقاول رئيسي
            </button>
            <button
              onClick={() => setRole(UserRole.SUBCONTRACTOR)}
              className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all ${
                role === UserRole.SUBCONTRACTOR ? 'bg-white shadow text-orange-600' : 'text-gray-500'
              }`}
            >
              <HardHat size={18} />
              مقاول باطن
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div className="relative">
                <UserIcon className="absolute right-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="اسم الشركة / المؤسسة"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pr-11 pl-4 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute right-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pr-11 pl-4 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute right-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                placeholder="كلمة المرور"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pr-11 pl-4 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isRegister ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-500">
            {isRegister ? 'لديك حساب بالفعل؟' : 'ليس لديك حساب؟'}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-orange-600 font-bold mr-1"
            >
              {isRegister ? 'سجل دخولك' : 'أنشئ حساباً'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
