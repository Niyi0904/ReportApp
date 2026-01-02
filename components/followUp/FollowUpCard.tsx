import { FollowUp } from '@/types';
import { format } from 'date-fns';
import { Phone, MapPin, MessageSquare, Users, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface FollowUpCardProps {
  followUp: FollowUp;
}

const typeConfig = {
  call: { icon: Phone, label: 'Phone Call', color: 'text-secondary' },
  visit: { icon: MapPin, label: 'Home Visit', color: 'text-primary' },
  message: { icon: MessageSquare, label: 'Message', color: 'text-muted-foreground' },
  meeting: { icon: Users, label: 'Meeting', color: 'text-success' },
};

const outcomeConfig = {
  positive: { label: 'Positive', className: 'bg-success/10 text-success border-success/20' },
  neutral: { label: 'Neutral', className: 'bg-muted text-muted-foreground border-border' },
  'needs-attention': { label: 'Needs Attention', className: 'bg-warning/10 text-warning border-warning/20' },
};

export const FollowUpCard = ({ followUp }: FollowUpCardProps) => {
  const type = typeConfig[followUp.type];
  const outcome = outcomeConfig[followUp.outcome];
  const TypeIcon = type.icon;

  return (
    <div className="p-5 rounded-xl bg-card border border-border shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in">
      <div className="flex items-start gap-4">
        <div className={cn(
          'w-10 h-10 rounded-lg flex items-center justify-center bg-muted',
          type.color
        )}>
          <TypeIcon size={20} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="font-semibold text-foreground truncate">{followUp.soulName}</h3>
            <Badge variant="outline" className={cn('text-xs shrink-0', outcome.className)}>
              {outcome.label}
            </Badge>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {format(followUp.date, 'MMM d, yyyy')}
            </span>
            <span>{type.label}</span>
          </div>
          
          <p className="text-sm text-foreground/80 bg-muted/50 rounded-lg p-3">
            {followUp.notes}
          </p>
        </div>
      </div>
    </div>
  );
};
