"use client"

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { DateFilter } from '@/components/DateFilter';
import { ExportButton } from '@/components/ExportButton';
import { SoulCard } from '@/components/evangelism/SoulCard';
import { Button } from '@/components/ui/button';
import { mockSouls } from '@/data/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export default function Evangelism () {
  const [souls, setSouls] = useState(mockSouls);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSoul, setNewSoul] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
    status: 'new' as const,
  });

  const handleAddSoul = () => {
    if (!newSoul.name) {
      toast.error('Name is required');
      return;
    }

    const soul = {
      ...newSoul,
      id: String(souls.length + 1),
      evangelizedBy: '1',
      evangelizedAt: new Date(),
      createdAt: new Date(),
    };

    setSouls([soul, ...souls]);
    setNewSoul({ name: '', phone: '', address: '', notes: '', status: 'new' });
    setIsDialogOpen(false);
    toast.success('Soul added successfully!');
  };

  const exportData = souls.map((s) => ({
    name: s.name,
    phone: s.phone || '',
    address: s.address || '',
    status: s.status,
    notes: s.notes || '',
    date: s.evangelizedAt.toISOString().split('T')[0],
  }));

  // Summary stats
  const totalSouls = souls.length;
  const convertedSouls = souls.filter(s => s.status === 'converted').length;
  const followingUpSouls = souls.filter(s => s.status === 'following-up').length;

  return (
      <div className="p-8 bg-white rounded-xl">
        <PageHeader 
          title="Evangelism" 
          description="Track souls reached and their spiritual journey"
          action={
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Plus size={18} />
                  Add Soul
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-display">Add New Soul</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={newSoul.name}
                      onChange={(e) => setNewSoul({ ...newSoul, name: e.target.value })}
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={newSoul.phone}
                      onChange={(e) => setNewSoul({ ...newSoul, phone: e.target.value })}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={newSoul.address}
                      onChange={(e) => setNewSoul({ ...newSoul, address: e.target.value })}
                      placeholder="Enter address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={newSoul.status} onValueChange={(v: any) => setNewSoul({ ...newSoul, status: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="following-up">Following Up</SelectItem>
                        <SelectItem value="converted">Converted</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={newSoul.notes}
                      onChange={(e) => setNewSoul({ ...newSoul, notes: e.target.value })}
                      placeholder="Enter any notes"
                      rows={3}
                    />
                  </div>
                  <Button variant="outline" className="w-full" onClick={handleAddSoul}>
                    Add Soul
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          }
        />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-sm text-muted-foreground">Total Souls</p>
            <p className="text-2xl font-display font-bold text-primary">{totalSouls}</p>
          </div>
          <div className="p-4 rounded-xl bg-success/10 border border-success/20">
            <p className="text-sm text-muted-foreground">Converted</p>
            <p className="text-2xl font-display font-bold text-success">{convertedSouls}</p>
          </div>
          <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20">
            <p className="text-sm text-muted-foreground">Following Up</p>
            <p className="text-2xl font-display font-bold text-secondary">{followingUpSouls}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <DateFilter />
          <ExportButton 
            data={exportData}
            filename="evangelism_report"
            headers={['Name', 'Phone', 'Address', 'Status', 'Notes', 'Date']}
          />
        </div>

        {/* Soul Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {souls.map((soul, index) => (
            <div key={soul.id} style={{ animationDelay: `${index * 0.05}s` }}>
              <SoulCard 
                soul={soul}
                onFollowUp={(s) => toast.info(`Adding follow-up for ${s.name}`)}
                onEdit={(s) => toast.info(`Editing ${s.name}`)}
                onDelete={(s) => toast.info(`Deleting ${s.name}`)}
              />
            </div>
          ))}
        </div>
      </div>
  );
};

