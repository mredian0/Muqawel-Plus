
import React, { useState, useMemo } from 'react';
import { Project, Application, User, TradeCategory, ExperienceLevel } from '../types';
import { Plus, MapPin, Calendar, DollarSign, CheckCircle, XCircle, Wand2, Loader2, Filter, Users, Star, Award, Search } from 'lucide-react';
import { getGeminiHelp } from '../geminiService';

interface MainDashboardProps {
  view: string;
  setView: (v: any) => void;
  projects: Project[];
  onAddProject: (p: Project) => void;
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
  subcontractors: User[];
}

const MainDashboard: React.FC<MainDashboardProps> = ({ view, setView, projects, onAddProject, applications, setApplications, subcontractors }) => {
  const [newProject, setNewProject] = useState({ title: '', description: '', budget: '', location: '', deadline: '', category: 'أعمال مدنية' as TradeCategory });
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  // Filtering states for Applications
  const [appFilterTrade, setAppFilterTrade] = useState<string>('');
  const [appFilterExp, setAppFilterExp] = useState<string>('');

  // Filtering states for Directory
  const [dirSearch, setDirSearch] = useState('');
  const [dirTrade, setDirTrade] = useState('');

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProject({
      ...newProject,
      budget: parseFloat(newProject.budget),
      budgetFormatted: `${parseFloat(newProject.budget).toLocaleString()} ريال`,
      id: Date.now().toString(),
      postedBy: 'user1',
      createdAt: new Date().toISOString().split('T')[0],
      status: 'OPEN'
    });
  };

  const handleAiHelp = async () => {
    if (!newProject.title) return alert("يرجى كتابة عنوان المشروع أولاً");
    setIsAiLoading(true);
    const prompt = `اكتب وصفاً احترافياً وتفصيلياً لمشروع مقاولات بعنوان: "${newProject.title}". اجعله يتضمن المتطلبات التقنية والمواصفات المتوقعة.`;
    const result = await getGeminiHelp(prompt);
    setNewProject(prev => ({ ...prev, description: result }));
    setIsAiLoading(false);
  };

  const updateApplicationStatus = (appId: string, status: 'ACCEPTED' | 'REJECTED') => {
    setApplications(apps => apps.map(a => a.id === appId ? { ...a, status } : a));
  };

  const filteredSubcontractors = useMemo(() => {
    return subcontractors.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(dirSearch.toLowerCase()) || s.location?.includes(dirSearch);
      const matchTrade = dirTrade === '' || s.trade === dirTrade;
      return matchSearch && matchTrade;
    });
  }, [subcontractors, dirSearch, dirTrade]);

  const getFilteredApps = (projId: string) => {
    return applications.filter(a => {
      const isProject = a.projectId === projId;
      const matchTrade = appFilterTrade === '' || a.subcontractorTrade === appFilterTrade;
      const matchExp = appFilterExp === '' || a.subcontractorExp === appFilterExp;
      return isProject && matchTrade && matchExp;
    });
  };

  if (view === 'directory') {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Users className="text-orange-600" />
          دليل مقاولي الباطن
        </h2>
        
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-3 text-gray-400" size={18} />
            <input 
              className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 pr-10 pl-4 text-sm"
              placeholder="ابحث بالاسم أو الموقع..."
              value={dirSearch}
              onChange={e => setDirSearch(e.target.value)}
            />
          </div>
          <select 
            className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm outline-none"
            value={dirTrade}
            onChange={e => setDirTrade(e.target.value)}
          >
            <option value="">كل التخصصات</option>
            <option value="كهرباء">كهرباء</option>
            <option value="سباكة">سباكة</option>
            <option value="تكييف">تكييف</option>
            <option value="أعمال مدنية">أعمال مدنية</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSubcontractors.map(s => (
            <div key={s.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-50 hover:border-orange-200 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 font-bold">
                    {s.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{s.name}</h4>
                    <p className="text-xs text-gray-500">{s.trade} • {s.location}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 text-orange-500 text-xs font-bold">
                    <Star size={12} fill="currentColor" /> {s.rating}
                  </div>
                  <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full mt-1">{s.experienceLevel}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {s.certifications?.map(cert => (
                  <span key={cert} className="text-[10px] bg-green-50 text-green-600 px-2 py-1 rounded-lg flex items-center gap-1">
                    <Award size={10} /> {cert}
                  </span>
                ))}
              </div>
              <button className="w-full mt-4 bg-gray-50 text-gray-600 text-xs font-bold py-2 rounded-xl group-hover:bg-orange-600 group-hover:text-white transition-all">
                عرض الملف الشخصي
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (view === 'post') {
    return (
      <div className="bg-white p-6 rounded-3xl shadow-sm">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Plus className="text-orange-600" />
          إضافة مشروع جديد
        </h2>
        <form onSubmit={handlePost} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">عنوان المشروع</label>
              <input
                required
                className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="مثال: بناء فيلا سكنية، أعمال عظم..."
                value={newProject.title}
                onChange={e => setNewProject({ ...newProject, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">تصنيف العمل</label>
              <select 
                className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none"
                value={newProject.category}
                onChange={e => setNewProject({ ...newProject, category: e.target.value as TradeCategory })}
              >
                <option value="أعمال مدنية">أعمال مدنية</option>
                <option value="كهرباء">كهرباء</option>
                <option value="سباكة">سباكة</option>
                <option value="تكييف">تكييف</option>
                <option value="تشطيبات">تشطيبات</option>
              </select>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">وصف المشروع</label>
              <button 
                type="button"
                onClick={handleAiHelp}
                className="text-xs flex items-center gap-1 text-orange-600 font-bold hover:underline"
                disabled={isAiLoading}
              >
                {isAiLoading ? <Loader2 className="animate-spin" size={14} /> : <Wand2 size={14} />}
                توليد وصف احترافي بالذكاء الاصطناعي
              </button>
            </div>
            <textarea
              required
              rows={4}
              className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="اكتب تفاصيل المشروع، المتطلبات، والمواصفات..."
              value={newProject.description}
              onChange={e => setNewProject({ ...newProject, description: e.target.value })}
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الميزانية التقديرية (ريال)</label>
              <input
                required
                type="number"
                className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="مثال: 100000"
                value={newProject.budget}
                onChange={e => setNewProject({ ...newProject, budget: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الموقع</label>
              <input
                required
                className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="المدينة / الحي"
                value={newProject.location}
                onChange={e => setNewProject({ ...newProject, location: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">آخر موعد للتقديم</label>
            <input
              required
              type="date"
              className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none"
              value={newProject.deadline}
              onChange={e => setNewProject({ ...newProject, deadline: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg mt-4"
          >
            نشر المشروع الآن
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl shadow-sm border-r-4 border-orange-600 flex flex-col justify-center">
          <p className="text-gray-500 text-xs">مشاريعك النشطة</p>
          <p className="text-2xl font-bold">{projects.length}</p>
        </div>
        <div className="bg-white p-5 rounded-3xl shadow-sm border-r-4 border-green-600 flex flex-col justify-center">
          <p className="text-gray-500 text-xs">العروض الواردة</p>
          <p className="text-2xl font-bold">{applications.length}</p>
        </div>
        <div 
          onClick={() => setView('directory')}
          className="bg-orange-600 p-5 rounded-3xl shadow-lg text-white flex flex-col justify-center cursor-pointer hover:bg-orange-700 transition-all"
        >
          <p className="text-orange-100 text-xs">تصفح المقاولين</p>
          <p className="text-xl font-bold flex items-center gap-2">دليل المقاولين <Users size={20} /></p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg">إدارة المشاريع والعروض</h3>
        {projects.map(p => (
          <div key={p.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-bold text-gray-800">{p.title}</h4>
                <span className="text-[10px] text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded-full">{p.category}</span>
              </div>
              <span className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded-lg">نشط</span>
            </div>
            <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">{p.description}</p>
            <div className="flex flex-wrap gap-4 text-[10px] text-gray-400 border-b border-gray-50 pb-4">
              <div className="flex items-center gap-1"><MapPin size={12} /> {p.location}</div>
              <div className="flex items-center gap-1"><Calendar size={12} /> ينتهي في {p.deadline}</div>
              <div className="flex items-center gap-1"><DollarSign size={12} /> {p.budgetFormatted}</div>
            </div>

            {/* Application Filters */}
            <div className="mt-4 flex flex-wrap gap-2 items-center">
               <span className="text-[10px] font-bold text-gray-400">تصفية العروض:</span>
               <select 
                className="text-[10px] border border-gray-100 rounded-lg px-2 py-1 bg-gray-50"
                value={appFilterTrade}
                onChange={e => setAppFilterTrade(e.target.value)}
               >
                 <option value="">كل التخصصات</option>
                 <option value="كهرباء">كهرباء</option>
                 <option value="سباكة">سباكة</option>
               </select>
               <select 
                className="text-[10px] border border-gray-100 rounded-lg px-2 py-1 bg-gray-50"
                value={appFilterExp}
                onChange={e => setAppFilterExp(e.target.value)}
               >
                 <option value="">كل الخبرات</option>
                 <option value="مبتديء">مبتديء</option>
                 <option value="متوسط">متوسط</option>
                 <option value="خبير">خبير</option>
               </select>
            </div>

            <div className="mt-4 space-y-3">
              {getFilteredApps(p.id).length === 0 ? (
                <p className="text-xs text-center text-gray-300 py-4">لا توجد عروض مطابقة للتصفية</p>
              ) : (
                getFilteredApps(p.id).map(app => (
                  <div key={app.id} className="bg-gray-50 p-4 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold">{app.subcontractorName}</p>
                        <span className="text-[9px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-full">{app.subcontractorExp}</span>
                      </div>
                      <p className="text-xs text-green-600 font-bold">{app.bidAmount.toLocaleString()} ريال</p>
                      <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">"{app.proposal}"</p>
                    </div>
                    {app.status === 'PENDING' ? (
                      <div className="flex gap-2 w-full md:w-auto">
                        <button 
                          onClick={() => updateApplicationStatus(app.id, 'ACCEPTED')}
                          className="flex-1 md:flex-none flex items-center justify-center gap-1 px-4 py-2 bg-green-600 text-white rounded-xl text-xs font-bold shadow-md shadow-green-100"
                        >
                          <CheckCircle size={14} /> قبول
                        </button>
                        <button 
                          onClick={() => updateApplicationStatus(app.id, 'REJECTED')}
                          className="flex-1 md:flex-none flex items-center justify-center gap-1 px-4 py-2 bg-white text-red-600 border border-red-100 rounded-xl text-xs font-bold"
                        >
                          <XCircle size={14} /> رفض
                        </button>
                      </div>
                    ) : (
                      <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 ${
                        app.status === 'ACCEPTED' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {app.status === 'ACCEPTED' ? <><CheckCircle size={12} /> مقبول</> : <><XCircle size={12} /> مرفوض</>}
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainDashboard;
