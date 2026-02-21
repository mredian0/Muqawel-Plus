
import React from 'react';
import { User, UserRole } from '../types';
import { LayoutDashboard, PlusCircle, Briefcase, Search, FileText, LogOut, Users, User as UserIcon } from 'lucide-react';

interface NavbarProps {
  user: User;
  setView: (v: any) => void;
  activeView: string;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, setView, activeView, onLogout }) => {
  const isMain = user.role === UserRole.MAIN_CONTRACTOR;

  const NavItem = ({ view, icon: Icon, label }: { view: string, icon: any, label: string }) => (
    <button
      onClick={() => setView(view)}
      className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 p-2 md:px-4 md:py-3 rounded-xl transition-all ${
        activeView === view ? 'bg-orange-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-100'
      }`}
    >
      <Icon size={24} />
      <span className="text-[10px] md:text-sm font-medium whitespace-nowrap">{label}</span>
    </button>
  );

  return (
    <>
      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 flex justify-around items-center z-50 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <NavItem view="dashboard" icon={LayoutDashboard} label="الرئيسية" />
        {isMain ? (
          <NavItem view="directory" icon={Users} label="المقاولون" />
        ) : (
          <NavItem view="browse" icon={Search} label="بحث" />
        )}
        <NavItem view="profile" icon={UserIcon} label="حسابي" />
      </nav>

      {/* Desktop Sidebar */}
      <nav className="hidden md:flex fixed right-0 top-0 bottom-0 w-64 bg-white border-l border-gray-200 p-6 flex-col gap-4 z-50 shadow-xl shadow-gray-100">
        <div className="mb-8 text-orange-600 font-bold text-2xl flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-200">
            <Briefcase className="text-white" />
          </div>
          مقاول بلس
        </div>
        <div className="mb-6 px-2">
          <p className="text-[10px] text-gray-400 font-bold leading-tight">نربط المقاولين نبني المجتمعات</p>
        </div>
        
        <NavItem view="dashboard" icon={LayoutDashboard} label="لوحة التحكم" />
        {isMain ? (
          <>
            <NavItem view="post" icon={PlusCircle} label="إضافة مشروع جديد" />
            <NavItem view="directory" icon={Users} label="دليل المقاولين" />
            <NavItem view="my-projects" icon={Briefcase} label="إدارة مشاريعي" />
          </>
        ) : (
          <>
            <NavItem view="browse" icon={Search} label="استعراض المشاريع" />
            <NavItem view="my-applications" icon={FileText} label="طلبات التقديم" />
          </>
        )}
        
        <div className="mt-4 border-t border-gray-100 pt-4">
          <NavItem view="profile" icon={UserIcon} label="الملف الشخصي" />
        </div>

        <div className="mt-auto pt-6 border-t border-gray-100">
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 p-3 w-full text-red-500 hover:bg-red-50 rounded-xl transition-all font-bold"
          >
            <LogOut size={20} />
            <span className="text-sm">تسجيل الخروج</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
