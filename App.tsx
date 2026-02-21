
import React, { useState, useEffect } from 'react';
import { User, UserRole, Project, Application, TradeCategory } from './types';
import Login from './components/Login';
import Navbar from './components/Navbar';
import MainDashboard from './components/MainDashboard';
import SubDashboard from './components/SubDashboard';
import Profile from './components/Profile';
import Landing from './components/Landing';

const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'بناء فيلا سكنية - حي النرجس',
    description: 'مشروع بناء فيلا دورين وملحق بمساحة 400 متر مربع شاملة العظم والمواد.',
    budget: 500000,
    budgetFormatted: '500,000 ريال',
    location: 'الرياض',
    deadline: '2024-12-30',
    category: 'أعمال مدنية',
    postedBy: 'user1',
    createdAt: '2024-10-01',
    status: 'OPEN'
  },
  {
    id: '2',
    title: 'تركيب أنظمة تكييف مركزي',
    description: 'توريد وتركيب أنظمة تكييف لبرج تجاري مكون من 10 طوابق.',
    budget: 1200000,
    budgetFormatted: '1,200,000 ريال',
    location: 'جدة',
    deadline: '2025-01-15',
    category: 'تكييف',
    postedBy: 'user1',
    createdAt: '2024-10-05',
    status: 'OPEN'
  }
];

const MOCK_SUBCONTRACTORS: User[] = [
  { id: 'sub1', name: 'مؤسسة التميز للكهرباء', role: UserRole.SUBCONTRACTOR, email: 'elec@ex.com', trade: 'كهرباء', experienceLevel: 'خبير', certifications: ['تصنيف فئة أولى', 'ISO 9001'], rating: 4.8, location: 'الرياض' },
  { id: 'sub2', name: 'شركة روافد للسباكة', role: UserRole.SUBCONTRACTOR, email: 'plumb@ex.com', trade: 'سباكة', experienceLevel: 'متوسط', certifications: ['بلدي المعتمدة'], rating: 4.2, location: 'جدة' },
];

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showLanding, setShowLanding] = useState(true);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [applications, setApplications] = useState<Application[]>([]);
  const [view, setView] = useState<'dashboard' | 'post' | 'my-projects' | 'browse' | 'my-applications' | 'directory' | 'profile'>('dashboard');

  const handleStart = () => {
    setShowLanding(false);
  };

  const handleLogin = (u: User) => {
    setUser(u);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setShowLanding(true);
  };

  const addProject = (p: Project) => {
    setProjects([p, ...projects]);
    setView('dashboard');
  };

  const submitApplication = (app: Application) => {
    const enrichedApp = {
      ...app,
      subcontractorTrade: user?.trade,
      subcontractorExp: user?.experienceLevel
    };
    setApplications([...applications, enrichedApp]);
  };

  const handleUpdateProfile = (updatedUser: User) => {
    setUser(updatedUser);
  };

  if (showLanding && !user) {
    return <Landing onStart={handleStart} />;
  }

  if (!user) {
    return <Login onLogin={handleLogin} onBack={() => setShowLanding(true)} />;
  }

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0 md:pr-64">
      <Navbar user={user} setView={setView} activeView={view} onLogout={handleLogout} />

      <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full">
        {view !== 'profile' && (
          <header className="mb-8 flex justify-between items-center bg-white p-4 rounded-3xl shadow-sm border border-orange-50">
            <div className="flex items-center gap-4">
              <div 
                onClick={() => setView('profile')}
                className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-105 transition-transform"
              >
                {user.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">أهلاً، {user.name}</h1>
                <p className="text-xs text-gray-500">
                  {user.role === UserRole.MAIN_CONTRACTOR ? 'إدارة المشاريع والمقاولين' : 'استعراض الفرص والبحث المتقدم'}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                {user.role === UserRole.MAIN_CONTRACTOR ? 'مقاول رئيسي' : 'مقاول باطن'}
              </div>
              {user.trade && <span className="text-[10px] text-gray-400 mt-1">{user.trade} • {user.experienceLevel}</span>}
            </div>
          </header>
        )}

        {view === 'profile' ? (
          <Profile user={user} onUpdate={handleUpdateProfile} onBack={() => setView('dashboard')} />
        ) : user.role === UserRole.MAIN_CONTRACTOR ? (
          <MainDashboard 
            view={view} 
            setView={setView} 
            projects={projects} 
            onAddProject={addProject}
            applications={applications}
            setApplications={setApplications}
            subcontractors={MOCK_SUBCONTRACTORS}
          />
        ) : (
          <SubDashboard 
            view={view} 
            setView={setView} 
            projects={projects} 
            onApply={submitApplication}
            myApplications={applications.filter(a => a.subcontractorId === user.id)}
          />
        )}
      </main>
    </div>
  );
};

export default App;
