import { User, Soul, PrayerGroup, FollowUp, DashboardStats, MonthlyData } from '@/types';

export const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', createdAt: new Date('2024-01-15') },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user', createdAt: new Date('2024-02-20') },
  { id: '3', name: 'Michael Brown', email: 'michael@example.com', role: 'user', createdAt: new Date('2024-03-10') },
  { id: '4', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'user', createdAt: new Date('2024-03-25') },
  { id: '5', name: 'David Wilson', email: 'david@example.com', role: 'user', createdAt: new Date('2024-04-05') },
];

export const mockSouls: Soul[] = [
  { id: '1', name: 'Robert Green', phone: '+1234567890', address: '123 Main St', notes: 'Very interested in Bible study', status: 'following-up', evangelizedBy: '1', evangelizedAt: new Date('2024-12-01'), createdAt: new Date('2024-12-01') },
  { id: '2', name: 'Emily White', phone: '+1234567891', address: '456 Oak Ave', notes: 'Met at community event', status: 'new', evangelizedBy: '1', evangelizedAt: new Date('2024-12-15'), createdAt: new Date('2024-12-15') },
  { id: '3', name: 'James Miller', phone: '+1234567892', address: '789 Pine Rd', notes: 'Accepted Christ, needs discipleship', status: 'converted', evangelizedBy: '2', evangelizedAt: new Date('2024-11-20'), createdAt: new Date('2024-11-20') },
  { id: '4', name: 'Maria Garcia', phone: '+1234567893', address: '321 Elm St', notes: 'Spanish speaking, very receptive', status: 'following-up', evangelizedBy: '1', evangelizedAt: new Date('2024-12-10'), createdAt: new Date('2024-12-10') },
  { id: '5', name: 'William Taylor', phone: '+1234567894', address: '654 Maple Dr', status: 'new', evangelizedBy: '3', evangelizedAt: new Date('2024-12-20'), createdAt: new Date('2024-12-20') },
  { id: '6', name: 'Jennifer Anderson', phone: '+1234567895', notes: 'Connected through neighbor', status: 'converted', evangelizedBy: '2', evangelizedAt: new Date('2024-10-15'), createdAt: new Date('2024-10-15') },
];

export const mockPrayerGroups: PrayerGroup[] = [
  { id: '1', date: new Date('2024-12-23'), userId: '1', status: 'present' },
  { id: '2', date: new Date('2024-12-24'), userId: '1', status: 'present' },
  { id: '3', date: new Date('2024-12-25'), userId: '1', status: 'excused', notes: 'Christmas' },
  { id: '4', date: new Date('2024-12-26'), userId: '1', status: 'present' },
  { id: '5', date: new Date('2024-12-27'), userId: '1', status: 'absent' },
  { id: '6', date: new Date('2024-12-28'), userId: '1', status: 'present' },
  { id: '7', date: new Date('2024-12-29'), userId: '1', status: 'present' },
  { id: '8', date: new Date('2024-12-23'), userId: '2', status: 'present' },
  { id: '9', date: new Date('2024-12-24'), userId: '2', status: 'absent' },
  { id: '10', date: new Date('2024-12-25'), userId: '2', status: 'excused', notes: 'Christmas' },
];
export const mockDashboardStats: DashboardStats = {
  totalSoulsReached: 156,
  prayerGroupAttendance: 87,
  totalFollowUps: 342,
  conversionRate: 24,
  monthlyGrowth: 12,
};

export const mockMonthlyData: MonthlyData[] = [
  { month: 'Jul', souls: 12, followUps: 28, attendance: 85 },
  { month: 'Aug', souls: 18, followUps: 35, attendance: 82 },
  { month: 'Sep', souls: 15, followUps: 42, attendance: 88 },
  { month: 'Oct', souls: 22, followUps: 48, attendance: 90 },
  { month: 'Nov', souls: 28, followUps: 56, attendance: 86 },
  { month: 'Dec', souls: 35, followUps: 62, attendance: 92 },
];
