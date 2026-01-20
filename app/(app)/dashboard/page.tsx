"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useMemo } from "react";
import {
  Heart,
  MessageSquare,
  TrendingUp,
  Users,
  ArrowUpRight,
  Activity,
  CheckCircle2,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import StatCard from "@/components/StatCard";
import { useGetAllEvangelismsByUser } from "@/features/evangelism/queries";
import { useGetAllFollowUpByUser } from "@/features/followUp/queries"; // Assuming this exists
import { LoadingState } from "@/components/LoadingState";
import Link from "next/link";

export default function DashboardPage() {
  const user = useSelector((state: RootState) => state.auth.user);

  // Queries
  const { data: evangelisms = [], isLoading: isEvangelismLoading } = 
    useGetAllEvangelismsByUser(user?.uid!);
  const { data: followUps = [], isLoading: isFollowUpLoading } = 
    useGetAllFollowUpByUser(user?.uid!);

  // --- DYNAMIC DATA CALCULATIONS ---
  const dashboardStats = useMemo(() => {
    // 1. Total Souls Reached (Sum of souls array in each evangelism session)
    const totalSouls = evangelisms.reduce((acc, curr) => acc + (curr.souls?.length || 0), 0);
    
    // 2. Total Follow-up Sessions
    const totalFollowUps = followUps.length;

    // 3. Conversion Rate (Saved & Filled / Total Souls)
    const allSouls = evangelisms.flatMap(e => e.souls || []);
    const savedAndFilled = allSouls.filter(s => s.status === "saved and filled").length;
    const conversionRate = totalSouls > 0 ? Math.round((savedAndFilled / totalSouls) * 100) : 0;

    // 4. Activity Growth (Flat list of all souls across time for the chart)
    const chartData = evangelisms
      .map(e => ({
        date: new Date(e.evangelismDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        count: e.souls?.length || 0,
        timestamp: new Date(e.evangelismDate).getTime()
      }))
      .sort((a, b) => a.timestamp - b.timestamp);

    // 5. Recent Activity Feed
    const recentActivity = allSouls
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);

    return { totalSouls, totalFollowUps, conversionRate, chartData, recentActivity, savedAndFilled };
  }, [evangelisms, followUps]);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  if (isEvangelismLoading || isFollowUpLoading) return <LoadingState />;

  return (
    <div className="min-h-screen bg-[#FDFCFB] rounded-3xl p-4 md:p-8 space-y-8">
      {/* Dynamic Glassmorphism Header */}
      <div className="relative overflow-hidden rounded-3xl bg-[#634832] p-8 text-white shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {greeting()}, {user?.displayName?.split(' ')[0]}!
            </h1>
            <p className="mt-2 text-stone-200 max-w-md">
              You've reached <span className="font-bold text-white">{dashboardStats.totalSouls} souls</span> this season. 
              Your impact is growing.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/20">
              <p className="text-xs uppercase tracking-widest text-stone-300">Conversion</p>
              <p className="text-2xl font-bold">{dashboardStats.conversionRate}%</p>
            </div>
          </div>
        </div>
        {/* Decorative background circle */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Souls Reached"
          value={dashboardStats.totalSouls}
          icon={<Users size={20} />}
          color="brown"
          trend="+12% from last month"
        />
        <StatCard
          title="Saved & Filled"
          value={dashboardStats.savedAndFilled}
          icon={<CheckCircle2 size={20} />}
          color="emerald"
        />
        <StatCard
          title="Follow-ups Done"
          value={dashboardStats.totalFollowUps}
          icon={<MessageSquare size={20} />}
          color="blue"
        />
        <StatCard
          title="Ministry Impact"
          value={`${dashboardStats.conversionRate}%`}
          icon={<TrendingUp size={20} />}
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ministry Growth Area Chart */}
        <div className="lg:col-span-2 rounded-3xl bg-white border border-stone-100 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-stone-800">Ministry Growth</h3>
              <p className="text-sm text-stone-500">Visualizing souls reached over time</p>
            </div>
            <Activity className="text-stone-300" size={24} />
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dashboardStats.chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#634832" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#634832" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                fontSize={12} 
                tick={{fill: '#888'}}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                fontSize={12} 
                tick={{fill: '#888'}}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="count" 
                stroke="#634832" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Souls Feed */}
        <div className="rounded-3xl bg-white border border-stone-100 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-stone-800">Latest Reach</h3>
            <Link className="text-xs font-bold text-[#634832] hover:underline flex items-center gap-1"  href="/evangelism">
              View All <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="space-y-5">
            {dashboardStats.recentActivity.length > 0 ? (
              dashboardStats.recentActivity.map((soul) => (
                <div key={soul.id} className="group flex items-center gap-4 transition-all">
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-sm transition-colors ${
                    soul.gender === 'male' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'
                  }`}>
                    {soul.name.charAt(0)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-stone-800 truncate group-hover:text-[#634832] transition-colors">
                      {soul.name}
                    </p>
                    <p className="text-xs text-stone-500 uppercase tracking-wider font-medium">
                      {soul.status}
                    </p>
                  </div>

                  <div className="text-[10px] font-bold text-stone-400 bg-stone-50 px-2 py-1 rounded-md">
                    {new Date(soul.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-center text-stone-400 text-sm italic">
                No activity recorded yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}