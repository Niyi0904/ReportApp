import { FollowUp } from '@/types';
import { format } from 'date-fns';
import { Calendar, Clock, MoreVertical, Trash2, User, BookOpen, StickyNote, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu';

interface FollowUpCardProps {
  followUp: FollowUp;
  onDelete?: (id: string) => void;
  deletingFollowUp: boolean
}

const outcomeConfig = {
  receptive: {
    label: 'Receptive',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    accent: 'bg-emerald-500',
  },
  'non-receptive': {
    label: 'Non-receptive',
    className: 'bg-amber-50 text-amber-700 border-amber-200',
    accent: 'bg-amber-500',
  },
};

export const FollowUpCard = ({ followUp, onDelete, deletingFollowUp }: FollowUpCardProps) => {
  const outcome = outcomeConfig[followUp.status as keyof typeof outcomeConfig];

  return (
    <Dialog>
      <div className="group relative flex flex-col h-full min-h-80 p-5 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        {/* Status Accent Bar */}
        <div className={cn("absolute left-0 top-0 bottom-0 w-1", outcome.accent)} />

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1">
            <h3 className="font-bold text-base text-foreground leading-tight">
              {followUp.discipleName}
            </h3>
            <Badge variant="outline" className={cn("px-2 py-0 text-[10px] font-medium uppercase tracking-wider", outcome.className)}>
              {outcome.label}
            </Badge>
          </div>

          <div className="flex items-center gap-1">
            <DialogTrigger asChild>
              <button className="p-1.5 rounded-full hover:bg-muted text-muted-foreground transition-colors">
                <Maximize2 size={16} />
              </button>
            </DialogTrigger>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1.5 rounded-full hover:bg-muted text-muted-foreground transition-colors">
                  <MoreVertical size={18} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  disabled={deletingFollowUp}
                  className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                  onClick={() => onDelete?.(followUp.id)}
                >
                  <Trash2 size={14} className="mr-2" />
                  {deletingFollowUp ? "Deleting..." : "Delete Record"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-y-3 mb-5 pb-4 border-b border-border/50 text-[13px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="opacity-70" />
            {format(new Date(followUp.followUpDate), 'MMM d, yyyy')}
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} className="opacity-70" />
            {followUp.duration}
          </div>
          <div className="flex items-center gap-2 capitalize">
            <User size={14} className="opacity-70" />
            {followUp.gender}
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-4 grow cursor-default">
          {followUp.topic && (
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <BookOpen size={12} className="text-primary/60" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Topic</span>
              </div>
              <p className="text-sm font-medium text-foreground line-clamp-2 leading-snug">
                {followUp.topic}
              </p>
            </div>
          )}

          {followUp.notes && (
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <StickyNote size={12} className="text-primary/60" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Notes</span>
              </div>
              <p className="text-sm text-muted-foreground/90 line-clamp-3 leading-relaxed italic">
                "{followUp.notes}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Full Details Modal */}
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
             <Badge variant="outline" className={cn("uppercase text-[10px]", outcome.className)}>
              {outcome.label}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {format(new Date(followUp.followUpDate), 'PPPP')}
            </span>
          </div>
          <DialogTitle className="text-2xl font-bold">{followUp.discipleName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          <div className="grid grid-cols-2 gap-4 p-3 bg-muted/30 rounded-lg border border-border">
            <div>
              <p className="text-[10px] uppercase font-bold text-muted-foreground">Duration</p>
              <p className="text-sm font-medium">{followUp.duration}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-muted-foreground">Gender</p>
              <p className="text-sm font-medium capitalize">{followUp.gender}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase text-primary/70 tracking-tighter">Teaching Topic</h4>
            <p className="text-base text-foreground font-medium leading-relaxed">{followUp.topic}</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase text-primary/70 tracking-tighter">Detailed Notes</h4>
            <div className="p-4 bg-muted/20 rounded-xl border border-border/50">
              <p className="text-sm text-muted-foreground leading-loose whitespace-pre-wrap">
                {followUp.notes}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};