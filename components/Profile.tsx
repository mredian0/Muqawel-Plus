
import React, { useState } from 'react';
import { User, UserRole, TradeCategory, ExperienceLevel } from '../types';
import { User as UserIcon, Mail, Phone, MapPin, Building2, Save, Edit2, ChevronLeft, Award, FileText, CheckCircle } from 'lucide-react';

interface ProfileProps {
  user: User;
  onUpdate: (u: User) => void;
  onBack: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User>({ ...user });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isSub = user.role === UserRole.SUBCONTRACTOR;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-6">
        <button onClick={onBack} className="flex items-center gap-1 text-gray-500 hover:text-orange-600 font-medium transition-colors">
          <ChevronLeft size={20} />
          العودة للرئيسية
        </button>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
          >
            <Edit2 size={16} className="text-orange-600" />
            تعديل الملف
          </button>
        )}
      </div>

      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-100 text-green-700 p-4 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top-2">
          <CheckCircle size={20} />
          <p className="text-sm font-bold">تم حفظ التغييرات بنجاح!</p>
        </div>
      )}

      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        {/* Header/Cover Area */}
        <div className="h-32 bg-orange-600 relative">
          <div className="absolute -bottom-12 right-8 flex items-end gap-4">
            <div className="w-24 h-24 bg-white rounded-3xl p-1 shadow-xl">
              <div className="w-full h-full bg-orange-50 rounded-[1.2rem] flex items-center justify-center text-3xl font-bold text-orange-600">
                {user.name.charAt(0)}
              </div>
            </div>
            <div className="pb-2">
              <h2 className="text-2xl font-bold text-white drop-shadow-md">{user.name}</h2>
              <span className="text-orange-100 text-xs font-medium">عضو منذ 2024</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="pt-16 p-8 space-y-8">
          {/* General Information */}
          <section>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <FileText size={16} /> المعلومات العامة
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600 block px-1">اسم المنشأة</label>
                <div className="relative">
                  <Building2 className="absolute right-3 top-3 text-gray-400" size={18} />
                  <input
                    disabled={!isEditing}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pr-10 pl-4 text-sm focus:ring-2 focus:ring-orange-500 outline-none disabled:opacity-70"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600 block px-1">البريد الإلكتروني</label>
                <div className="relative">
                  <Mail className="absolute right-3 top-3 text-gray-400" size={18} />
                  <input
                    disabled={!isEditing}
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pr-10 pl-4 text-sm focus:ring-2 focus:ring-orange-500 outline-none disabled:opacity-70"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600 block px-1">رقم الجوال</label>
                <div className="relative">
                  <Phone className="absolute right-3 top-3 text-gray-400" size={18} />
                  <input
                    disabled={!isEditing}
                    name="phone"
                    placeholder="05xxxxxxxx"
                    value={formData.phone || ''}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pr-10 pl-4 text-sm focus:ring-2 focus:ring-orange-500 outline-none disabled:opacity-70"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-600 block px-1">الموقع / المدينة</label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-3 text-gray-400" size={18} />
                  <input
                    disabled={!isEditing}
                    name="location"
                    value={formData.location || ''}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pr-10 pl-4 text-sm focus:ring-2 focus:ring-orange-500 outline-none disabled:opacity-70"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Business Details */}
          <section className="bg-gray-50/50 -mx-8 p-8 border-y border-gray-50">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Award size={16} /> تفاصيل العمل
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {isSub && (
                <>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-600 block px-1">التخصص الرئيسي</label>
                    <select
                      disabled={!isEditing}
                      name="trade"
                      value={formData.trade || ''}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-100 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-orange-500 outline-none disabled:opacity-70"
                    >
                      <option value="">اختر التخصص</option>
                      <option value="كهرباء">كهرباء</option>
                      <option value="سباكة">سباكة</option>
                      <option value="تكييف">تكييف</option>
                      <option value="أعمال مدنية">أعمال مدنية</option>
                      <option value="تشطيبات">تشطيبات</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-600 block px-1">مستوى الخبرة</label>
                    <select
                      disabled={!isEditing}
                      name="experienceLevel"
                      value={formData.experienceLevel || ''}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-100 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-orange-500 outline-none disabled:opacity-70"
                    >
                      <option value="">اختر المستوى</option>
                      <option value="مبتديء">مبتديء</option>
                      <option value="متوسط">متوسط</option>
                      <option value="خبير">خبير</option>
                    </select>
                  </div>
                </>
              )}
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-gray-600 block px-1">نبذة عن المنشأة</label>
                <textarea
                  disabled={!isEditing}
                  name="bio"
                  rows={4}
                  value={formData.bio || ''}
                  onChange={handleChange}
                  placeholder="اكتب نبذة مختصرة عن أعمالكم وخبراتكم..."
                  className="w-full bg-white border border-gray-100 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-orange-500 outline-none disabled:opacity-70 leading-relaxed"
                ></textarea>
              </div>
            </div>
          </section>

          {isEditing && (
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-100 flex items-center justify-center gap-2 hover:bg-orange-700 transition-all active:scale-95"
              >
                <Save size={18} /> حفظ التغييرات
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({ ...user });
                }}
                className="px-8 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-all"
              >
                إلغاء
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
