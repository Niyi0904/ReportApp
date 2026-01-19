"use client"

import { useMemo, useState } from 'react';
import { Plus, Filter, CheckCircle, AlertCircle, Search } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { DateFilter } from '@/components/DateFilter';
import { ExportButton } from '@/components/ExportButton';
import { FollowUpCard } from '@/components/followUp/FollowUpCard';
import { Button } from '@/components/ui/button';
import { mockFollowUps, mockSouls } from '@/data/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { FollowUp } from '@/types';
import { FollowUpForm } from '@/components/forms/followUpForm/followUpForm';
import StatCard from '@/components/StatCard';
import { LoadingState } from '@/components/LoadingState';
import { useFollowUp } from '@/features/followUp/queries';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';

export default function FollowUps () {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterOutcome, setFilterOutcome] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonthKey, setSelectedMonthKey] = useState<string>(
    `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(
      2,
      "0"
    )}`
  );

  const user = useSelector((state: RootState) => state.auth.user);
  
  const userId = user?.uid as string;
  const { data: followUps = [], isLoading, refetch } = useFollowUp(
    userId,
    selectedMonthKey
  );

  const exportData = followUps.map((f) => ({
    discipleName: f.discipleName,
    date: f.followUpDate.toISOString().split("T")[0],
    topic: f.topic,
    duration: f.duration,
    gender: f.gender,
    notes: f.notes,
    status: f.status
  }));


  const filteredFollowUps = useMemo(() => {
    let currentFiltered = followUps;

    // Filter by outcome
    if (filterOutcome !== "all") {
      currentFiltered = currentFiltered.filter(
        (f) => f.status === filterOutcome
      );
    }

    // Filter by search term
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      currentFiltered = currentFiltered.filter(
        (f) =>
          f.discipleName.toLowerCase().includes(lowerCaseSearchTerm)
    );
    }
    return currentFiltered;
  }, [followUps, filterOutcome, searchTerm]);

  
  const totalFollowUps = followUps.length;
  const Receptive = followUps.filter(
    (f) => f.status === "receptive"
  ).length;
  const nonReceptive = followUps.filter(
    (f) => f.status === "non-receptive"
  ).length;

  return (
      <div className="min-h-screen rounded-xl bg-muted/40 p-4 md:p-8 space-y-8">
        <PageHeader
          title="Follow-Up"
          description="Track all follow up done"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Follow-ups"
            value={totalFollowUps}
            icon={<Plus size={20} />} // Reusing Plus or you could use something like 'ListChecks'
            color="orange"
          />
          <StatCard
            title="Receptive"
            value={Receptive}
            icon={<CheckCircle size={20} />} // New icon for positive outcomes
            color="emerald"
          />
          <StatCard
            title="Non-receptive"
            value={nonReceptive}
            icon={<AlertCircle size={20} />} // New icon for needs attention
            color="purple" // Or another color that fits your theme
          />
        </div>

        {/* Search Input */}
        <div className="mb-4">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by soul name or notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-2 bg-background border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-bg"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <DateFilter 
            showMonthFilter={true}
            onMonthChange={(newMonth) => setSelectedMonthKey(newMonth)}
          />
          <Select value={filterOutcome} onValueChange={setFilterOutcome}>
            <SelectTrigger className="w-45">
              <Filter size={16} className="mr-2" />
              <SelectValue placeholder="Filter outcome" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Outcomes</SelectItem>
              <SelectItem value="receptive">Receptive</SelectItem>
              <SelectItem value="non-receptive">Non-receptive</SelectItem>
            </SelectContent>
          </Select>
          <ExportButton 
            data={exportData}
            filename="followups_report"
            headers={['Disciple name', 'Follow-up Date', 'Topic', 'Duration', 'Gender', 'Notes', 'Status']}
          />

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="default" className="bg-secondary-bg gap-2">
                <Plus size={18} /> Add Follow-up {/* Updated button text */}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto"> {/* Added styling */}
              <DialogHeader>
                <DialogTitle>Add New Follow-up</DialogTitle> {/* Updated title */}
              </DialogHeader>
              <FollowUpForm
                onSuccess={() => {
                  setIsDialogOpen(false);
                  // refetch(); // Call refetch to update the list after adding
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Follow-up Cards */}
        <div>
        {isLoading ? (
          <LoadingState message="Fetching follow-up data..." />
        ) : filteredFollowUps.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            No follow-ups found for this month or matching your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFollowUps.map((followUp, index) => (
              <div key={followUp.id} style={{ animationDelay: `${index * 0.05}s` }}>
                <FollowUpCard
                  followUp={followUp}
                  // onEdit={() => toast.info(`Editing follow-up for ${followUp.soulName}`)}
                  // onDelete={() => toast.info(`Deleting follow-up for ${followUp.soulName}`)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

        {filteredFollowUps.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No follow-ups found</p>
          </div>
        )}
      </div>
  );
};