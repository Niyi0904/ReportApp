"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { DateFilter } from "@/components/DateFilter";
import { ExportButton } from "@/components/ExportButton";
import { SoulCard } from "@/components/evangelism/SoulCard";
import { Button } from "@/components/ui/button";
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
    `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(
      2,
      "0"
    )}`
  );

  
  const { data: evangelisms = [], isLoading, refetch } = useEvangelism(
    user?.uid!,
    selectedMonthKey
  );
  
  // Combine all souls with evangelismDate
  const allSouls = evangelisms.flatMap((e) =>
    e.souls.map((soul) => ({
      ...soul,
      evangelizedAt: e.evangelismDate,
    }))
  );
  
  // Filtered souls
  const filteredSouls = allSouls.filter((soul) =>
    soul.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalSouls = allSouls.length;
  const convertedSouls = allSouls.filter((s) => s.status === "saved and filled").length;
  const followingUpSouls = allSouls.filter(
    (s) => s.status === "saved and filled"
  ).length;

  const GOAL_SOULS = 300;

  // Calculate evangelism rate toward goal
  const evangelismRate = ((totalSouls / GOAL_SOULS) * 100).toFixed(1); // "0.3"

  const exportData = allSouls.map((s) => ({
    name: s.name,
    phone: s.phone || "",
    address: s.address || "",
    status: s.status,
    notes: s.notes || "",
    date: s.evangelizedAt.toISOString().split("T")[0],
  }));

  return (
    <div className="min-h-screen rounded-xl bg-muted/40 p-4 md:p-8 space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Evangelism"
        description="Track souls reached and their spiritual journey"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Souls"
          value={totalSouls}
          icon={<Plus size={20} />}
          color="orange"
        />
        <StatCard
          title="Converted"
          value={convertedSouls}
          icon={<Plus size={20} />}
          color="emerald"
        />
        <StatCard
          title="Evangelism Rate"
          value={`${evangelismRate}%`}
          icon={<Plus size={20} />}
          color="blue"
        >
          <div className="h-2 w-full bg-muted/30 rounded-full mt-2">
            <div
              className="h-2 bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${evangelismRate}%` }}
            ></div>
          </div>
        </StatCard>
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-wrap-reverse items-center justify-between gap-4">
        <DateFilter
          showMonthFilter={true}
          onMonthChange={(newMonth) => setSelectedMonthKey(newMonth)}
        />

        <div className="flex gap-2 justify-between md:justify-center md:w-auto w-full">
          <ExportButton
            data={exportData}
            filename="evangelism_report"
            headers={["Name", "Phone", "Address", "Status", "Notes", "Date"]}
          />

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="default" className="bg-secondary-bg gap-2">
                <Plus size={18} /> Add Soul
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Souls</DialogTitle>
              </DialogHeader>
              <EvangelismForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-3 py-2 bg-background border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-bg"
        />
      </div>


      {/* Souls Grid */}
      <div>
        {isLoading ? (
          <LoadingState message="Fetching evangelism data..." />
        ) : allSouls.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No Evangelism recorded this month.
          </p>
        ) : (
          <>
            {
              filteredSouls.length !== 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSouls.map((soul) => (
                    <SoulCard
                      key={soul.id}
                      soul={soul}
                      onFollowUp={() =>
                        toast.info(`Adding follow-up for ${soul.name}`)
                      }
                      onEdit={() => toast.info(`Editing ${soul.name}`)}
                      onDelete={() => toast.info(`Deleting ${soul.name}`)}
                    />
                  ))}
                </div>
              ) : (
                <div>
                  <p className="text-muted-foreground text-center">No data found</p>
                </div>
              )
            }
          </>
        )}
      </div>
    </div>
  );
}
