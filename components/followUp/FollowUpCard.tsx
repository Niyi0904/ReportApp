import { FollowUp } from '@/types';
import { format } from 'date-fns';
import { Calendar, Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface FollowUpCardProps {
  followUp: FollowUp;
}

const outcomeConfig = {
  receptive: {
    label: 'Receptive',
    className: 'bg-success/10 text-success border-success/20',
  },
  'non-receptive': {
    label: 'Needs Attention',
    className: 'bg-warning/10 text-warning border-warning/20',
  },
};

export const FollowUpCard = ({ followUp }: FollowUpCardProps) => {
  const outcome = outcomeConfig[followUp.status];

  return (
    <div className="p-5 rounded-xl bg-card border border-border shadow-soft hover:shadow-medium transition-all duration-300">
      
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <h3 className="font-semibold text-foreground truncate">
          {followUp.discipleName}
        </h3>

        <Badge
          variant="outline"
          className={cn('text-xs shrink-0', outcome.className)}
        >
          {outcome.label}
        </Badge>
      </div>

      {/* Meta Row */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4">
        <span className="flex items-center gap-1">
          <Calendar size={14} />
          {format(followUp.followUpDate, 'MMM d, yyyy')}
        </span>

        {followUp.duration && (
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {followUp.duration}
          </span>
        )}

        {followUp.gender && (
          <span className="flex items-center gap-1">
            <User size={14} />
            {followUp.gender}
          </span>
        )}
      </div>

      {/* Topic (Readonly Input Style) */}
      {followUp.topic && (
        <div className="mb-3">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
            Topic
          </p>
          <div className="text-sm text-foreground bg-muted/50 rounded-lg px-3 py-2 border border-border">
            {followUp.topic}
          </div>
        </div>
      )}

      {/* Notes (Textarea Style) */}
      {followUp.notes && (
        <div>
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
            Notes
          </p>
          <div className="text-sm text-foreground/80 bg-muted/50 rounded-lg p-3 leading-relaxed border border-border">
            {followUp.notes}
          </div>
        </div>
      )}
    </div>
  );
};
