"use client"

import { useMemo, useState } from 'react';
import { Plus, Filter, CheckCircle, AlertCircle, Search, ListChecks, FileSpreadsheet, SlidersHorizontal } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { DateFilter } from '@/components/DateFilter';
import { ExportButton } from '@/components/ExportButton';
import { FollowUpCard } from '@/components/followUp/FollowUpCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { FollowUpForm } from '@/components/forms/followUpForm/followUpForm';
import StatCard from '@/components/StatCard';
import { LoadingState } from '@/components/LoadingState';
import { useFollowUp } from '@/features/followUp/queries';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { useDeleteFollowUp } from '@/features/followUp/mutations';
import { useQueryClient } from "@tanstack/react-query";
import { FollowUp } from '@/features/followUp/types';

export default function FollowUps() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterOutcome, setFilterOutcome] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonthKey, setSelectedMonthKey] = useState<string>(
    `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`
  );
  
  const client = useQueryClient();
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.uid as string;

  const { mutateAsync: deleteFollowUp, isPending: deletingFollowUp } = useDeleteFollowUp();

  const handleDelete = async (id: string) => {
    const deleteAction = deleteFollowUp(id, {
      onSuccess: () => {
        client.setQueryData<FollowUp[]>(
          ["follow-up", userId, selectedMonthKey],
          (old = []) => old.filter((f) => f.id !== id)

        );
      },
    });

    toast.promise(deleteAction, {
      loading: 'Removing record...',
      success: 'Record deleted',
      error: (err) => err.message || 'Failed to delete',
    });
  };

  const { data: followUps = [], isLoading } = useFollowUp(userId, selectedMonthKey);

  const filteredFollowUps = useMemo(() => {
    return followUps.filter((f) => {
      const matchesStatus = filterOutcome === "all" || f.status === filterOutcome;
      const matchesSearch = f.discipleName.toLowerCase().includes(searchTerm.toLowerCase()) || f.notes?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [followUps, filterOutcome, searchTerm]);

  // Stats calculation
  const stats = useMemo(() => ({
    total: followUps.length,
    receptive: followUps.filter(f => f.status === "receptive").length,
    nonReceptive: followUps.filter(f => f.status === "non-receptive").length
  }), [followUps]);

  const exportData = followUps.map((f) => ({
    disciplename: f.discipleName,
    followupdate: f.followUpDate.toISOString().split("T")[0],
    topic: f.topic,
    duration: f.duration,
    gender: f.gender,
    notes: f.notes,
    status: f.status
  }));

  return (
    <div className="min-h-screen bg-[#FDFCFB] rounded-3xl p-4 md:p-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <PageHeader 
          title="Follow-Up" 
          description="Manage and review your recent discipleship interactions."
        />
        
        <div className="flex items-center gap-3">
          <ExportButton 
            data={exportData}
            filename="ministry_report"
            headers={['Disciple name', 'Follow-up Date', 'Topic', 'Duration', 'Gender', 'Notes', 'Status']}
            className="shadow-sm bg-white" 
          />
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-secondary-bg hover:bg-secondary-bg-hover text-white shadow-md transition-all active:scale-95">
                <Plus size={18} className="mr-2" /> New Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-125 max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">Log New Follow-Up</DialogTitle>
              </DialogHeader>
              <FollowUpForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        <StatCard title="Total Sessions" value={stats.total} icon={<ListChecks size={20} />} color="brown" />
        <StatCard title="Receptive" value={stats.receptive} icon={<CheckCircle size={20} />} color="emerald" />
        <StatCard title="Needs Attention" value={stats.nonReceptive} icon={<AlertCircle size={20} />} color="amber" />
      </div>

      {/* Modern Filter Toolbar */}
      <div className="sticky top-4 z-10 flex flex-col lg:flex-row items-center gap-4 p-3 bg-white/80 backdrop-blur-md border border-border rounded-2xl shadow-sm">
        <div className="relative w-full lg:flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60" size={18} />
          <Input
            placeholder="Search by disciple name or specific notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-11 h-11 bg-stone-50 border-2 focus-visible:ring-1 ring-primary/20 transition-all"
          />
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="h-11 px-1 bg-muted/20 rounded-lg flex items-center border border-transparent focus-within:border-border transition-all">
            <DateFilter 
              showMonthFilter={true}
              onMonthChange={(newMonth) => setSelectedMonthKey(newMonth)}
            />
          </div>

          <Select value={filterOutcome} onValueChange={setFilterOutcome}>
            <SelectTrigger className="w-full lg:w-45 h-11 bg-muted/20 border-2 shadow-none focus:ring-1">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-muted-foreground/70" />
                <SelectValue placeholder="All Outcomes" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Outcomes</SelectItem>
              <SelectItem value="receptive">Receptive Only</SelectItem>
              <SelectItem value="non-receptive">Non-Receptive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Grid */}
      <div className="min-h-100">
        {isLoading ? (
          <LoadingState message="Loading your ministry records..." />
        ) : filteredFollowUps.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
             <div className="bg-muted/30 p-6 rounded-full mb-4">
                <Search size={40} className="text-muted-foreground/40" />
             </div>
             <h3 className="text-lg font-medium">No records found</h3>
             <p className="text-muted-foreground max-w-62.5">
               Try adjusting your filters or search terms for {selectedMonthKey}
             </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
            {filteredFollowUps.map((followUp, index) => (
              <FollowUpCard
                key={followUp.id}
                followUp={followUp}
                onDelete={(id) => handleDelete(id)}
                deletingFollowUp={deletingFollowUp}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}