"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";

import {
  Heart,
  Calendar,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import StatCard from "@/components/StatCard";
import { useState } from "react";
import { useGetAllEvangelismsByUser } from "@/features/evangelism/queries";

// ----------------------------------
// MOCK DATA (replace with real API)
// ----------------------------------
const stats = {
  soulsReached: 124,
  prayerAttendance: 78,
  followUps: 56,
  conversionRate: 34,
};

const growthData = [
  { month: "Jan", value: 20 },
  { month: "Feb", value: 35 },
  { month: "Mar", value: 50 },
  { month: "Apr", value: 70 },
  { month: "May", value: 95 },
];

const recentSouls = [
  {
    id: 1,
    name: "Samuel Ade",
    date: "Mar 21",
    status: "follow-up",
  },
  {
    id: 2,
    name: "Grace Bello",
    date: "Mar 20",
    status: "converted",
  },
  {
    id: 3,
    name: "Daniel James",
    date: "Mar 19",
    status: "new",
  },
];

// ----------------------------------
// PAGE
// ----------------------------------
export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const user = useSelector((state: RootState) => state.auth.user);

  const { data: evangelisms = [], isLoading, refetch } = useGetAllEvangelismsByUser(user?.uid!);

  console.log(evangelisms);

  const greeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen rounded-xl bg-muted/40 p-4 md:p-8">
      <h1 className="text-2xl font-bold pb-2">Dashboard</h1>
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header */}
        <div className="rounded-xl bg-background border p-6">
          <h1 className="text-2xl md:text-3xl font-bold">
            {greeting()}, {user?.displayName}!
          </h1>
          <p className="text-muted-foreground">
            Overview of your ministry activities and impact
          </p>
        </div>
        

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Souls Reached"
            value={stats.soulsReached}
            icon={<Heart size={20} />}
            color="orange"
          />
          <StatCard
            title="Prayer Attendance"
            value={`${stats.prayerAttendance}%`}
            icon={<Calendar size={20} />}
            color="blue"
          />
          <StatCard
            title="Follow-ups"
            value={stats.followUps}
            icon={<MessageSquare size={20} />}
            color="emerald"
          />
          <StatCard
            title="Conversion Rate"
            value={`${stats.conversionRate}%`}
            icon={<TrendingUp size={20} />}
            color="purple"
          />
        </div>

        {/* Charts & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Growth Chart */}
          <div className="lg:col-span-2 rounded-xl bg-background border p-6">
            <h3 className="font-semibold mb-4">Ministry Growth</h3>

            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Activity */}
          <div className="rounded-xl bg-background border p-6">
            <h3 className="font-semibold mb-4">Recent Souls</h3>

            <div className="space-y-4">
              {recentSouls.map((soul) => (
                <div
                  key={soul.id}
                  className="flex items-center gap-4 rounded-lg border p-4"
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
                    {soul.name.charAt(0)}
                  </div>

                  <div className="flex-1">
                    <p className="font-medium">{soul.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Reached on {soul.date}
                    </p>
                  </div>

                  <span className="text-xs rounded-full px-2 py-1 bg-muted">
                    {soul.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ----------------------------------
// COMPONENTS
// ----------------------------------

