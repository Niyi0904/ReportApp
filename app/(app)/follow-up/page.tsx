"use client"

import { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
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

export default function FollowUps () {
  const [followUps, setFollowUps] = useState<FollowUp[]>(mockFollowUps);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterOutcome, setFilterOutcome] = useState<string>('all');
  const [newFollowUp, setNewFollowUp] = useState({
    soulId: '',
    type: 'call' as const,
    notes: '',
    outcome: 'neutral' as const,
  });

  const handleAddFollowUp = () => {
    if (!newFollowUp.soulId || !newFollowUp.notes) {
      toast.error('Please fill in all required fields');
      return;
    }

    const soul = mockSouls.find(s => s.id === newFollowUp.soulId);
    if (!soul) return;

    const followUp: FollowUp = {
      id: String(followUps.length + 1),
      soulId: newFollowUp.soulId,
      soulName: soul.name,
      userId: '1',
      date: new Date(),
      type: newFollowUp.type,
      notes: newFollowUp.notes,
      outcome: newFollowUp.outcome,
    };

    setFollowUps([followUp, ...followUps]);
    setNewFollowUp({ soulId: '', type: 'call', notes: '', outcome: 'neutral' });
    setIsDialogOpen(false);
    toast.success('Follow-up added successfully!');
  };

  const filteredFollowUps = filterOutcome === 'all' 
    ? followUps 
    : followUps.filter(f => f.outcome === filterOutcome);

  // Summary stats
  const totalFollowUps = followUps.length;
  const positiveFollowUps = followUps.filter(f => f.outcome === 'positive').length;
  const needsAttention = followUps.filter(f => f.outcome === 'needs-attention').length;

  const exportData = followUps.map((f) => ({
    soulname: f.soulName,
    date: format(f.date, 'yyyy-MM-dd'),
    type: f.type,
    notes: f.notes,
    outcome: f.outcome,
  }));

  return (
      <div className="p-8 bg-white rounded-xl">
        <PageHeader 
          title="Follow-ups" 
          description="Track your follow-up activities with souls"
          action={
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Plus size={18} />
                  Add Follow-up
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-display">Add New Follow-up</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="soul">Soul *</Label>
                    <Select value={newFollowUp.soulId} onValueChange={(v) => setNewFollowUp({ ...newFollowUp, soulId: v })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a soul" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockSouls.map((soul) => (
                          <SelectItem key={soul.id} value={soul.id}>{soul.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select value={newFollowUp.type} onValueChange={(v: any) => setNewFollowUp({ ...newFollowUp, type: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="call">Phone Call</SelectItem>
                        <SelectItem value="visit">Home Visit</SelectItem>
                        <SelectItem value="message">Message</SelectItem>
                        <SelectItem value="meeting">Meeting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="outcome">Outcome</Label>
                    <Select value={newFollowUp.outcome} onValueChange={(v: any) => setNewFollowUp({ ...newFollowUp, outcome: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="positive">Positive</SelectItem>
                        <SelectItem value="neutral">Neutral</SelectItem>
                        <SelectItem value="needs-attention">Needs Attention</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes *</Label>
                    <Textarea
                      id="notes"
                      value={newFollowUp.notes}
                      onChange={(e) => setNewFollowUp({ ...newFollowUp, notes: e.target.value })}
                      placeholder="Describe the follow-up"
                      rows={3}
                    />
                  </div>
                  <Button variant="outline" className="w-full" onClick={handleAddFollowUp}>
                    Add Follow-up
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          }
        />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-sm text-muted-foreground">Total Follow-ups</p>
            <p className="text-2xl font-display font-bold text-primary">{totalFollowUps}</p>
          </div>
          <div className="p-4 rounded-xl bg-success/10 border border-success/20">
            <p className="text-sm text-muted-foreground">Positive Outcomes</p>
            <p className="text-2xl font-display font-bold text-success">{positiveFollowUps}</p>
          </div>
          <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
            <p className="text-sm text-muted-foreground">Needs Attention</p>
            <p className="text-2xl font-display font-bold text-warning">{needsAttention}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <DateFilter />
          <Select value={filterOutcome} onValueChange={setFilterOutcome}>
            <SelectTrigger className="w-45">
              <Filter size={16} className="mr-2" />
              <SelectValue placeholder="Filter outcome" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Outcomes</SelectItem>
              <SelectItem value="positive">Positive</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
              <SelectItem value="needs-attention">Needs Attention</SelectItem>
            </SelectContent>
          </Select>
          <ExportButton 
            data={exportData}
            filename="followups_report"
            headers={['Soul Name', 'Date', 'Type', 'Notes', 'Outcome']}
          />
        </div>

        {/* Follow-up Cards */}
        <div className="space-y-4">
          {filteredFollowUps.map((followUp, index) => (
            <div key={followUp.id} style={{ animationDelay: `${index * 0.05}s` }}>
              <FollowUpCard followUp={followUp} />
            </div>
          ))}
        </div>

        {filteredFollowUps.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No follow-ups found</p>
          </div>
        )}
      </div>
  );
};