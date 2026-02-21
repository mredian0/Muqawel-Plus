
import React, { useState, useMemo } from 'react';
import { Project, Application, TradeCategory } from '../types';
import { MapPin, Calendar, DollarSign, Send, Info, ChevronLeft, ShieldCheck, CheckCircle, Clock, Filter, SlidersHorizontal, Search, X } from 'lucide-react';

interface SubDashboardProps {
  view: string;
  setView: (v: any) => void;
  projects: Project[];
  onApply: (a: Application) => void;
  myApplications: Application[];
}

const SubDashboard: React.FC<SubDashboardProps> = ({ view, setView, projects, onApply, myApplications }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [bidAmount, setBidAmount] = useState('');
  const [proposal, setProposal] = useState('');
  const [isApplied, setIsApplied] = useState(false);

  // Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [filterLocation, setFilterLocation] = useState<string>('');
  const [maxBudget, setMaxBudget] = useState<number>(2000000);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = filterCategory === '' || p.category === filterCategory;
      const matchLocation = filterLocation === '' || p.location === filterLocation;
      const matchBudget = p.budget <= maxBudget;
      return matchSearch && matchCategory && matchLocation && matchBudget;
    });
  }, [projects, searchQuery, filterCategory, filterLocation, maxBudget]);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    onApply({
      id: Math.random().toString(36).substr(2, 9),
      projectId: selectedProject.id,
      subcontractorId: 'sub123',
      subcontractorName: 'مؤسسة التميز للمقاولات',
      bidAmount: parseFloat(bidAmount),
      proposal,
      status: 'PENDING'
    });
    setIsApplied(true);
    setTimeout(() => {
      setIsApplied(false);
      setSelectedProject(null);
      setBidAmount('');
      setProposal('');
    }, 2000);
  };

  const categories: TradeCategory[] = ['أعمال مدنية', 'كهرباء', 'سباكة', 'تكييف', 'تشطيبات', 'نجارة', 'حدادة'];
  const locations = Array.from(new Set(projects.map(p => p.location)));

  if (view === 'my-applications') {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-4">طلباتي السابقة</h2>
        {myApplications.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl text-center text-gray-500 border border-dashed border-gray-300">
            لا توجد طلبات تقديم حالياً
          </div>
        ) : (
          myApplications.map(app => {
            const project = projects.find(p => p.id === app.projectId);
            return (
              <div key={app.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-gray-800">{project?.title || 'مشروع محذوف'}</h4>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    app.status === 'PENDING' ? 'bg-orange-100 text-orange-600' : 
                    app.status === 'ACCEPTED' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {app.status === 'PENDING' ? 'قيد المراجعة' : app.status === 'ACCEPTED' ? 'مقبول' : 'مرفوض'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <DollarSign size={14} className="text-green-600" />
                  <span className="font-bold">{app.bidAmount.toLocaleString()} ريال</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl text-xs text-gray-600 italic">
                  "{app.proposal}"
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }

  if (selectedProject) {
    return (
      <div className="animate-in slide-in-from-left duration-300">
        <button onClick={() => setSelectedProject(null)} className="flex items-center gap-2 text-orange-600 mb-6 font-bold hover:translate-x-1 transition-transform">
          <ChevronLeft size={20} />
          العودة للمشاريع
        </button>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
            <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold">{selectedProject.category}</span>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-6">
             <div className="flex items-center gap-1 text-gray-500 text-xs"><MapPin size={14} /> {selectedProject.location}</div>
             <div className="flex items-center gap-1 text-gray-500 text-xs"><Calendar size={14} /> ينتهي في {selectedProject.deadline}</div>
             <div className="flex items-center gap-1 text-green-600 text-xs font-bold"><DollarSign size={14} /> {selectedProject.budgetFormatted}</div>
          </div>
          
          <div className="mb-8">
            <h3 className="font-bold mb-2 flex items-center gap-2 text-sm">
              <Info size={16} className="text-orange-600" />
              تفاصيل المشروع
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-wrap">
              {selectedProject.description}
            </p>
          </div>

          <form onSubmit={handleApply} className="space-y-4 border-t border-gray-100 pt-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
               <Send size={18} className="text-orange-600" />
               تقديم عرض سعر
            </h3>
            
            {isApplied ? (
              <div className="bg-green-50 text-green-700 p-8 rounded-2xl flex flex-col items-center gap-3 text-center border border-green-100">
                <CheckCircle size={56} />
                <p className="font-bold text-lg">تم إرسال عرضك بنجاح!</p>
                <p className="text-sm opacity-80">سيتواصل معك المقاول الرئيسي في حال قبول عرضك.</p>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">قيمة العرض المقترحة (بالريال)</label>
                  <div className="relative">
                    <DollarSign className="absolute right-3 top-3.5 text-gray-400" size={18} />
                    <input
                      required
                      type="number"
                      className="w-full border border-gray-200 rounded-xl py-3 pr-10 pl-4 focus:ring-2 focus:ring-orange-500 outline-none text-sm font-bold"
                      placeholder="0.00"
                      value={bidAmount}
                      onChange={e => setBidAmount(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2">رسالة توضيحية / خبرات سابقة</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-orange-500 outline-none text-sm leading-relaxed"
                    placeholder="اشرح لماذا أنت الأنسب لهذا المشروع، اذكر أعمالك السابقة المماثلة..."
                    value={proposal}
                    onChange={e => setProposal(e.target.value)}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-100 flex items-center justify-center gap-2 hover:bg-orange-700 transition-all active:scale-95"
                >
                  <Send size={18} />
                  إرسال العرض للمراجعة
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <input 
            type="text" 
            placeholder="ابحث عن مشاريع (سباكة، كهرباء، عظم...)" 
            className="w-full bg-white border border-gray-200 rounded-2xl py-3 px-10 shadow-sm focus:ring-2 focus:ring-orange-500 outline-none text-sm"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <Search className="absolute right-3 top-3.5 text-gray-400" size={18} />
        </div>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all ${
            showFilters ? 'bg-orange-600 text-white shadow-lg' : 'bg-white border border-gray-200 text-gray-600'
          }`}
        >
          <SlidersHorizontal size={18} />
          تصفية النتائج
        </button>
      </div>

      {showFilters && (
        <div className="bg-white p-6 rounded-3xl shadow-md border border-orange-50 animate-in slide-in-from-top duration-300">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-gray-800 flex items-center gap-2">
              <Filter size={18} className="text-orange-600" />
              خيارات التصفية المتقدمة
            </h4>
            <button onClick={() => {
              setFilterCategory('');
              setFilterLocation('');
              setMaxBudget(2000000);
            }} className="text-xs text-orange-600 hover:underline">إعادة ضبط</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">التخصص</label>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setFilterCategory('')}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${filterCategory === '' ? 'bg-orange-50 border-orange-200 text-orange-600 font-bold' : 'bg-gray-50 border-gray-100 text-gray-500'}`}
                >الكل</button>
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${filterCategory === cat ? 'bg-orange-50 border-orange-200 text-orange-600 font-bold' : 'bg-gray-50 border-gray-100 text-gray-500'}`}
                  >{cat}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">الموقع الجغرافي</label>
              <select 
                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm outline-none"
                value={filterLocation}
                onChange={e => setFilterLocation(e.target.value)}
              >
                <option value="">كل المدن</option>
                {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">الحد الأقصى للميزانية ({maxBudget.toLocaleString()} ريال)</label>
              <input 
                type="range" 
                min="10000" 
                max="2000000" 
                step="50000"
                className="w-full accent-orange-600"
                value={maxBudget}
                onChange={e => setMaxBudget(parseInt(e.target.value))}
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-bold">
                <span>10,000</span>
                <span>2,000,000</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">الفرص المتاحة لتقديرك ({filteredProjects.length})</h3>
          {filteredProjects.length !== projects.length && (
            <span className="text-[10px] text-gray-400">تم تصفية {projects.length - filteredProjects.length} مشروع</span>
          )}
        </div>
        
        {filteredProjects.length === 0 ? (
          <div className="bg-white p-16 rounded-3xl text-center flex flex-col items-center gap-4 border-2 border-dashed border-gray-100">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
               <Search size={32} />
            </div>
            <div>
              <p className="font-bold text-gray-600">لا توجد مشاريع تطابق بحثك</p>
              <p className="text-sm text-gray-400 mt-1">حاول تغيير خيارات التصفية أو البحث عن تخصص آخر</p>
            </div>
            <button 
              onClick={() => {
                setSearchQuery('');
                setFilterCategory('');
                setFilterLocation('');
                setMaxBudget(2000000);
              }}
              className="text-orange-600 text-sm font-bold border border-orange-200 px-6 py-2 rounded-xl"
            >
              عرض كل المشاريع
            </button>
          </div>
        ) : (
          filteredProjects.map(p => (
            <div 
              key={p.id} 
              onClick={() => setSelectedProject(p)}
              className="bg-white p-5 rounded-3xl shadow-sm border border-gray-50 hover:border-orange-200 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-1 h-full bg-orange-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-gray-800 group-hover:text-orange-600 transition-colors">{p.title}</h4>
                  <span className="text-[9px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">{p.category}</span>
                </div>
                <ShieldCheck className="text-green-500 opacity-50" size={18} title="مقاول موثق" />
              </div>
              <p className="text-gray-500 text-xs line-clamp-2 mb-4 leading-relaxed">{p.description}</p>
              <div className="flex flex-wrap gap-4 text-[10px] text-gray-400">
                <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg"><MapPin size={12} /> {p.location}</div>
                <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg"><Clock size={12} /> {p.deadline}</div>
                <div className="flex items-center gap-1 bg-green-50 text-green-600 px-2 py-1 rounded-lg font-bold"><DollarSign size={12} /> {p.budgetFormatted}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SubDashboard;
