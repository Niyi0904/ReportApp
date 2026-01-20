"use client";

import { useMemo, useState } from "react";
import { Plus, Search, Users, ShieldCheck, Target, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { DateFilter } from "@/components/DateFilter";
import { ExportButton } from "@/components/ExportButton";
import { SoulCard } from "@/components/evangelism/SoulCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEvangelism } from "@/features/evangelism/queries";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import StatCard from "@/components/StatCard";
import { EvangelismForm } from "@/components/forms/evangelismForms/evangelismForm";
import { LoadingState } from "@/components/LoadingState";

export default function Evangelism() {
  const [searchTerm, setSearchTerm] = useState("");
  const user = useSelector((state: RootState) => state.auth.user);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMonthKey, setSelectedMonthKey] = useState<string>(
    `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`
  );

  const { data: evangelisms = [], isLoading } = useEvangelism(user?.uid!, selectedMonthKey);

  // Memoized derived data
  const { allSouls, filteredSouls, stats } = useMemo(() => {
    const souls = evangelisms.flatMap((e) =>
      e.souls.map((soul) => ({
        ...soul,
        evangelizedAt: e.evangelismDate,
      }))
    );

    const filtered = souls.filter((soul) =>
      soul.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const GOAL_SOULS = 300;
    const total = souls.length;
    const converted = souls.filter((s) => s.status === "saved and filled").length;
    const rate = total > 0 ? ((total / GOAL_SOULS) * 100).toFixed(1) : "0";

    return { allSouls: souls, filteredSouls: filtered, stats: { total, converted, rate } };
  }, [evangelisms, searchTerm]);

  const exportData = allSouls.map((s) => ({
    name: s.name,
    phone: s.phone || "",
    address: s.address || "",
    status: s.status,
    notes: s.notes || "",
    date: new Date(s.evangelizedAt).toISOString().split("T")[0],
  }));

  return (
    <div className="min-h-screen bg-[#FDFCFB] rounded-3xl p-4 md:p-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <PageHeader
          title="Evangelism"
          description="Track souls reached and manage their spiritual journey."
        />
        
        <div className="flex items-center gap-3">
          <ExportButton
            data={exportData}
            filename="evangelism_report"
            headers={["Name", "Phone", "Address", "Status", "Notes", "Date"]}
            className="shadow-sm bg-white"
          />

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#634832] hover:bg-[#4d3827] text-white shadow-md transition-all active:scale-95">
                <Plus size={18} className="mr-2" /> Add Soul
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-125 max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">New Evangelism Record</DialogTitle>
              </DialogHeader>
              <EvangelismForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Reach"
          value={stats.total}
          icon={<Users size={20} />}
          color="brown"
          trend="Impact this month"
        />
        <StatCard
          title="Saved & Filled"
          value={stats.converted}
          icon={<ShieldCheck size={20} />}
          color="emerald"
        />
        <StatCard
          title="Monthly Goal"
          value={`${stats.rate}%`}
          icon={<Target size={20} />}
          color="blue"
        >
          <div className="h-1.5 w-full bg-blue-100 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${stats.rate}%` }}
            />
          </div>
        </StatCard>
      </div>

      {/* Professional Filter Bar */}
      <div className="flex flex-col lg:flex-row items-center gap-4 p-3 bg-white border  rounded-2xl shadow-sm">
        <div className="relative w-full lg:flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
          <Input
            placeholder="Search by disciple name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-11 h-11 bg-stone-50 border-2 focus-visible:ring-1 ring-stone-200 transition-all"
          />
        </div>

        <div className="w-full lg:w-auto  bg-stone-50 rounded-xl border-2">
          <DateFilter
            showMonthFilter={true}
            onMonthChange={(newMonth) => setSelectedMonthKey(newMonth)}
          />
        </div>
      </div>

      {/* Grid Display */}
      <div className="min-h-100">
        {isLoading ? (
          <LoadingState message="Fetching ministry records..." />
        ) : allSouls.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-dashed border-stone-200">
             <div className="bg-stone-50 p-6 rounded-full mb-4">
                <Users size={40} className="text-stone-300" />
             </div>
             <h3 className="text-lg font-bold text-stone-800">No records found</h3>
             <p className="text-stone-500 max-w-62.5 mx-auto">
               You haven't logged any evangelism activity for {selectedMonthKey} yet.
             </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
            {filteredSouls.map((soul) => (
              <SoulCard
                key={soul.id}
                soul={soul}
                onFollowUp={() => toast.info(`Adding follow-up for ${soul.name}`)}
                onEdit={() => toast.info(`Editing ${soul.name}`)}
                onDelete={() => toast.info(`Deleting ${soul.name}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}