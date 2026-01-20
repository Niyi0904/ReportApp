import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar, MapPin, MoreVertical, Phone, Plus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Soul } from "@/features/evangelism/types";
import { Badge } from "../ui/badge";

interface SoulCardProps {
  soul: Soul;
  onEdit?: (soul: Soul) => void;
  onDelete?: (soul: Soul) => void;
  onFollowUp?: (soul: Soul) => void;
}


type Status = "saved" | "saved and filled" | "filled";

export const SoulCard = ({ soul, onEdit, onDelete, onFollowUp }: SoulCardProps) => {
  return (
    <div className="p-6 rounded-3xl bg-white border border-stone-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
      {/* Top Decorator */}
      <div className={cn(
        "absolute top-0 left-0 w-full h-1",
        soul.gender === "male" ? "bg-blue-400" : "bg-pink-400"
      )} />

      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4">
          <div className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold shadow-sm transition-transform group-hover:scale-105",
            soul.gender === "male" ? "bg-blue-50 text-blue-600" : "bg-pink-50 text-pink-600"
          )}>
            {soul.name.charAt(0)}
          </div>

          <div className="space-y-1">
            <h3 className="font-bold text-stone-800 text-lg leading-tight">{soul.name}</h3>
            <div className="flex flex-wrap gap-2">
              <StatusBadge status={soul.status as Status} />
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full text-stone-400 hover:text-stone-900">
              <MoreVertical size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-xl border-stone-100">
            <DropdownMenuItem onClick={() => onFollowUp?.(soul)} className="gap-2 font-medium">
              <Plus size={14} /> Add Follow-up
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit?.(soul)} className="gap-2 font-medium text-stone-600">
              Edit Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete?.(soul)} className="gap-2 font-medium text-destructive">
              Delete Record
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-3 pt-2 border-t border-stone-50">
        {soul.phone && (
          <div className="flex gap-3 items-center text-stone-600">
            <div className="p-1.5 bg-stone-50 rounded-md"><Phone size={14} /></div>
            <span className="text-sm font-medium">{soul.phone}</span>
          </div>
        )}

        {soul.address && (
          <div className="flex gap-3 items-start text-stone-600">
            <div className="p-1.5 bg-stone-50 rounded-md mt-0.5"><MapPin size={14} /></div>
            <span className="text-sm font-medium line-clamp-1">{soul.address}</span>
          </div>
        )}

        <div className="flex gap-3 items-center text-stone-400">
          <div className="p-1.5 bg-stone-50 rounded-md"><Calendar size={14} /></div>
          <span className="text-[12px] font-bold uppercase tracking-wider">
            Reached on {(() => {
              const dateValue = (soul as any).evangelizedAt;              
              const date = dateValue ? new Date(dateValue) : null;
              return date && !isNaN(date.getTime()) 
                ? format(date, "PPPP") 
                : "Date Unknown";
            })()}
          </span>
        </div>
      </div>

      {soul.notes && (
        <div className="mt-5 p-4 bg-stone-50/80 rounded-2xl border border-stone-100 group-hover:bg-stone-50 transition-colors">
          <p className="text-sm text-stone-600 italic leading-relaxed">
            "{soul.notes}"
          </p>
        </div>
      )}
    </div>
  );
};

// Updated StatusBadge for professional look
function StatusBadge({ status }: { status: Status; }) {
  const styles = {
    "saved": "border-amber-200 text-amber-700 bg-amber-50",
    "saved and filled": "border-emerald-200 text-emerald-700 bg-emerald-50",
    "filled": "border-purple-200 text-purple-700 bg-purple-50",
    "unknown": "border-stone-200 text-stone-600 bg-stone-50"
  };

  return (
    <Badge variant="outline" className={cn("px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider", styles[status] || styles.unknown)}>
      {status}
    </Badge>
  );
}