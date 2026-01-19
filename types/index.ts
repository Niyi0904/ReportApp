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
  monthKey: string;
  userId: string
  followUpDate: Date,
  discipleName: string;
  topic: string;
  duration: string;
  gender: "male" | "female";
  status: "receptive" | "non-receptive"
  notes?: string;
  createdAt: Date
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
