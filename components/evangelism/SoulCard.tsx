import { Soul } from '@/types';
import { format } from 'date-fns';
import { Phone, MapPin, Calendar, User, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface SoulCardProps {
  soul: Soul;
  onEdit?: (soul: Soul) => void;
  onDelete?: (soul: Soul) => void;
  onFollowUp?: (soul: Soul) => void;
}

const statusConfig = {
  new: { label: 'New', className: 'bg-primary/10 text-primary border-primary/20' },
  'following-up': { label: 'Following Up', className: 'bg-secondary/10 text-secondary border-secondary/20' },
  converted: { label: 'Converted', className: 'bg-success/10 text-success border-success/20' },
  inactive: { label: 'Inactive', className: 'bg-muted text-muted-foreground border-border' },
};

export const SoulCard = ({ soul, onEdit, onDelete, onFollowUp }: SoulCardProps) => {
  const status = statusConfig[soul.status];

  return (
    <div className="p-5 rounded-xl bg-card border border-border shadow-soft hover:shadow-medium transition-all duration-300 group animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-lg">
            {soul.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-lg">{soul.name}</h3>
            <Badge variant="outline" className={cn('text-xs', status.className)}>
              {status.label}
            </Badge>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
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
              className="text-destructive focus:text-destructive"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-2 text-sm">
        {soul.phone && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone size={14} />
            <span>{soul.phone}</span>
          </div>
        )}
        {soul.address && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin size={14} />
            <span>{soul.address}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar size={14} />
          <span>Reached on {format(soul.evangelizedAt, 'MMM d, yyyy')}</span>
        </div>
      </div>

      {soul.notes && (
        <p className="mt-4 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
          {soul.notes}
        </p>
      )}
    </div>
  );
};
