import { Soul } from "@/features/evangelism/types";
import { format } from "date-fns";
import { Phone, MapPin, Calendar, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface SoulCardProps {
  soul: Soul;
  onEdit?: (soul: Soul) => void;
  onDelete?: (soul: Soul) => void;
  onFollowUp?: (soul: Soul) => void;
}


type Status = "saved" | "saved and filled" | "filled";

function StatusBadge({ status }: { status: Status }) {
  switch (status) {
    case "saved":
      return <Badge variant="outline">Saved</Badge>;
    case "saved and filled":
      return <Badge variant="outline">Saved and Filled</Badge>;
    case "filled":
      return <Badge variant="outline">Filled</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
}

export const SoulCard = ({
  soul,
  onEdit,
  onDelete,
  onFollowUp,
}: SoulCardProps) => {
  return (
    <div className="p-5 rounded-xl bg-card border shadow-soft hover:shadow-medium transition group">
      <div className="flex justify-between mb-4">
        <div className="flex gap-3">
          <div className="w-12 h-12 rounded-full bg-secondary-bg flex items-center justify-center text-white font-semibold">
            {soul.name.charAt(0)}
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold text-lg">{soul.name}</h3>

            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant="outline"
                className={cn(
                  "text-xs capitalize w-fit",
                  soul.gender === "male"
                    ? "border-blue-300 text-blue-600 bg-blue-50"
                    : "border-pink-300 text-pink-600 bg-pink-50"
                )}
              >
                {soul.gender}
              </Badge>
              <StatusBadge status={soul.status} />
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical size={16} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onFollowUp?.(soul)}>
              Add Follow-up
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit?.(soul)}>
              Edit Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete?.(soul)}
              className="text-destructive"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-2 text-sm text-muted-foreground">
        {soul.phone && (
          <div className="flex gap-2 items-center">
            <Phone size={14} />
            {soul.phone}
          </div>
        )}

        {soul.address && (
          <div className="flex gap-2 items-center">
            <MapPin size={14} />
            {soul.address}
          </div>
        )}

        <div className="flex gap-2 items-center">
          <Calendar size={14} />
          Reached on {format(soul.createdAt, "MMM d, yyyy")}
        </div>
      </div>

      {soul.notes && (
        <p className="mt-4 text-sm bg-muted/50 rounded-lg p-3">
          {soul.notes}
        </p>
      )}
    </div>
  );
};
