export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
  createdAt: Date;
}

export interface Soul {
  id: string;
  name: string;
  phone?: string;
  address?: string;
  notes?: string;
  status: 'new' | 'following-up' | 'converted' | 'inactive';
  evangelizedBy: string;
  evangelizedAt: Date;
  createdAt: Date;
}

export interface PrayerGroup {
  id: string;
  date: Date;
  userId: string;
  status: 'present' | 'absent' | 'excused';
  notes?: string;
}

export interface FollowUp {
  id: string;
  soulId: string;
  soulName: string;
  userId: string;
  date: Date;
  type: 'call' | 'visit' | 'message' | 'meeting';
  notes: string;
  outcome: 'positive' | 'neutral' | 'needs-attention';
}

export interface DashboardStats {
  totalSoulsReached: number;
  prayerGroupAttendance: number;
  totalFollowUps: number;
  conversionRate: number;
  monthlyGrowth: number;
}

export interface MonthlyData {
  month: string;
  souls: number;
  followUps: number;
  attendance: number;
}

export interface EditableFieldProps {
  label: string;
  value: string;
  field: string;
  type?: "text" | "select";
  options?: { label: string; value: string }[];
}
