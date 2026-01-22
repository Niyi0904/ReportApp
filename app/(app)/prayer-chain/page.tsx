"use client";

import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { format, isAfter, isSameDay, startOfYear, eachDayOfInterval } from "date-fns";
import { Calendar as CalendarIcon, Clock, CheckCircle2, XCircle, Plus, Zap } from "lucide-react";

import { RootState } from "@/app/redux/store";
import { PageHeader } from "@/components/PageHeader";
import { MonthNavigator } from "@/components/prayerChain/MonthNavigator";
import StatCard from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { PrayerRecordForm } from "@/components/forms/prayerChainRecordForm/prayerRecordForm";
import { LoadingState } from "@/components/LoadingState";

// Custom hooks for Firebase (to be implemented in your features folder)
import { useGetPrayerChainByMonth, useGetMyParticipation } from "@/features/prayerChain/queries";

export default function PrayerGroupsPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 1. Fetch the entire chain for the month and the user's participation records
  const { data: monthDocs = [], isLoading: loadingChain } = useGetPrayerChainByMonth(format(currentMonth, "yyyy-MM"));
  const { data: myParticipations = [], isLoading: loadingUser } = useGetMyParticipation(user?.uid!);

  // 2. Logic: Merge Calendar Days with Participation
  const prayerCalendar = useMemo(() => {
    const today = new Date();
    const start = startOfYear(new Date()); // Or start of ministry
    const days = eachDayOfInterval({ 
        start: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1), 
        end: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0) 
    });

    return days.map(day => {
      const isFuture = isAfter(day, today) && !isSameDay(day, today);
      const participation = myParticipations.find(p => {
        const pDate = p.date?.toDate ? p.date.toDate() : new Date(p.date);
        return isSameDay(pDate, day);
      });
      
      return {
        date: day,
        isFuture,
        isToday: isSameDay(day, today),
        status: participation ? "present" : (isFuture ? "upcoming" : "absent"),
        record: participation
      };
    });
  }, [currentMonth, myParticipations]);

  // 3. Stats calculation (Total year-to-date)
  const stats = useMemo(() => {
    const today = new Date();
    const yearStart = startOfYear(today);
    
    // 1. Calculate total days from Jan 1st until Today
    const totalDaysInYearToDate = eachDayOfInterval({ 
      start: yearStart, 
      end: today 
    }).length;

    // 2. Filter participation records to only count those within this year
    const prayedDaysThisYear = myParticipations.filter(p => {
      const pDate = p.date?.toDate ? p.date.toDate() : new Date(p.date);
      return pDate >= yearStart && pDate <= today;
    }).length;

    // 3. Calculate the annual rate
    const rate = totalDaysInYearToDate > 0 
      ? Math.round((prayedDaysThisYear / totalDaysInYearToDate) * 100) 
      : 0;

    return { 
      prayedDays: prayedDaysThisYear, 
      missedDays: Math.max(0, totalDaysInYearToDate - prayedDaysThisYear), 
      rate 
    };
  }, [myParticipations]);

  if (loadingChain || loadingUser) return <LoadingState />;

  return (
    <div className="min-h-screen bg-[#FDFCFB] rounded-3xl p-4 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <PageHeader
          title="Prayer Chain"
          description="Consistent communication with the Father."
        />
        <MonthNavigator
          currentMonth={currentMonth}
          onPrev={() => setCurrentMonth(prev => new Date(prev.setMonth(prev.getMonth() - 1)))}
          onNext={() => setCurrentMonth(prev => new Date(prev.setMonth(prev.getMonth() + 1)))}
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Annual Prayer Percentage"
          value={`${stats.rate}%`}
          icon={<Zap size={20} />}
          color="brown"
          trend="Year-to-date accuracy"
        />
        <StatCard
          title="Days Prayed"
          value={stats.prayedDays}
          icon={<CheckCircle2 size={20} />}
          color="emerald"
        />
        <StatCard
          title="Days Missed"
          value={stats.missedDays}
          icon={<XCircle size={20} />}
          color="amber"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Informational Sidebar */}
        <div className="order-first lg:order-last space-y-6">
            <div className="bg-[#634832] rounded-3xl p-6 text-white shadow-xl">
                <h4 className="font-bold mb-2">Spiritual Discipline</h4>
                <p className="text-sm text-stone-200 leading-relaxed">
                    "Pray without ceasing." Consistent prayer builds the spiritual stamina required for ministry impact.
                </p>
                <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex justify-between text-xs mb-2">
                        <span>Monthly Target</span>
                        <span>{stats.rate}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-amber-400 transition-all duration-1000" 
                            style={{ width: `${stats.rate}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>


        {/* Daily Calendar List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-stone-800 flex items-center gap-2">
            <CalendarIcon size={20} className="text-stone-400" />
            Attendance Log — {format(currentMonth, "MMMM yyyy")}
          </h3>
          
          <div className="grid gap-3">
            {prayerCalendar.map((item) => (
              <div 
                key={item.date.toISOString()}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                    item.isToday ? "bg-stone-50 border-[#634832]/20 shadow-sm" : "bg-white border-stone-100"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center font-bold text-xs ${
                    item.status === 'present' ? 'bg-emerald-50 text-emerald-600' : 'bg-stone-100 text-stone-400'
                  }`}>
                    <span>{format(item.date, "dd")}</span>
                    <span className="text-[8px] uppercase">{format(item.date, "EEE")}</span>
                  </div>
                  
                  <div>
                    <p className="font-bold text-stone-800 text-sm">
                        {item.isToday ? "Today's Prayer" : format(item.date, "do MMMM")}
                    </p>
                    <p className={`text-xs uppercase font-bold tracking-widest ${
                      item.status === 'present' ? 'text-emerald-500' : 'text-stone-400'
                    }`}>
                      {item.status}
                    </p>
                  </div>
                </div>

                {/* Point 4: Record Button logic */}
                <div className="flex items-center gap-3">
                  {item.status === 'present' && (
                    <div className="flex items-center gap-2 text-stone-500 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-100">
                      <Clock size={14} />
                      <span className="text-xs font-bold">{item.record?.duration} mins</span>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    {!item.isFuture && item.status !== 'present' && (
                      <Button 
                        size="sm" 
                        onClick={() => setSelectedDate(item.date)} // Just set the date
                        className="bg-[#634832] hover:bg-[#4d3827] rounded-xl gap-2"
                      >
                        <Plus size={14} /> Record
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Dialog 
            open={!!selectedDate} 
            onOpenChange={(open) => !open && setSelectedDate(null)}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Record Prayer for {selectedDate ? format(selectedDate, "PP") : ""}
                </DialogTitle>
                <DialogDescription className="sr-only">Prayer record form</DialogDescription>
              </DialogHeader>
              
              {selectedDate && (
                <PrayerRecordForm 
                  date={selectedDate} 
                  onSuccess={() => setSelectedDate(null)} 
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}