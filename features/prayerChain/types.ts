export interface PrayerParticipation {
  id: string;
  uid: string;
  firstName: string;
  lastName: string;
  from: string;
  to: string;
  duration: number; // in minutes
  status: "present" | "absent";
  date: any; // This will be converted to a Date object or Timestamp
  monthKey: string;
}