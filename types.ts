
export enum UserRole {
  MAIN_CONTRACTOR = 'MAIN_CONTRACTOR',
  SUBCONTRACTOR = 'SUBCONTRACTOR'
}

export type TradeCategory = 'أعمال مدنية' | 'كهرباء' | 'سباكة' | 'تكييف' | 'تشطيبات' | 'نجارة' | 'حدادة' | 'أخرى';
export type ExperienceLevel = 'مبتديء' | 'متوسط' | 'خبير';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone?: string;
  bio?: string;
  companyReg?: string; // سجل تجاري
  trade?: TradeCategory;
  experienceLevel?: ExperienceLevel;
  certifications?: string[];
  rating?: number;
  location?: string;
  address?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  budgetFormatted: string;
  location: string;
  deadline: string;
  category: TradeCategory;
  postedBy: string; // Main Contractor ID
  createdAt: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface Application {
  id: string;
  projectId: string;
  subcontractorId: string;
  subcontractorName: string;
  subcontractorTrade?: TradeCategory;
  subcontractorExp?: ExperienceLevel;
  bidAmount: number;
  proposal: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}
