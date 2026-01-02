import { PrayerGroup } from '@/types';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, getDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { Check, X, AlertCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface AttendanceCalendarProps {
  attendance: PrayerGroup[];
  month: Date;
}

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const AttendanceCalendar = ({ attendance, month }: AttendanceCalendarProps) => {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDayOfWeek = getDay(monthStart);

  const getAttendanceForDay = (date: Date) => {
    return attendance.find((a) => isSameDay(new Date(a.date), date));
  };

  const getStatusIcon = (status: 'present' | 'absent' | 'excused') => {
    switch (status) {
      case 'present':
        return <Check size={16} className="text-success" />;
      case 'absent':
        return <X size={16} className="text-destructive" />;
      case 'excused':
        return <AlertCircle size={16} className="text-warning" />;
    }
  };

  const getStatusBg = (status: 'present' | 'absent' | 'excused') => {
    switch (status) {
      case 'present':
        return 'bg-success/10 border-success/30';
      case 'absent':
        return 'bg-destructive/10 border-destructive/30';
      case 'excused':
        return 'bg-warning/10 border-warning/30';
    }
  };

  return (
    <div className="p-6 rounded-xl bg-card border border-border shadow-soft">
      <h3 className="text-lg font-display font-semibold mb-4 text-foreground">
        {format(month, 'MMMM yyyy')}
      </h3>
      
      <div className="grid grid-cols-7 gap-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
        
        {Array.from({ length: startDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        
        {days.map((day) => {
          const record = getAttendanceForDay(day);
          const isToday = isSameDay(day, new Date());
          
          return (
            <Tooltip key={day.toISOString()}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    'aspect-square flex flex-col items-center justify-center rounded-lg border transition-all cursor-pointer hover:scale-105',
                    record ? getStatusBg(record.status) : 'bg-muted/30 border-transparent',
                    isToday && 'ring-2 ring-primary ring-offset-2'
                  )}
                >
                  <span className={cn(
                    'text-sm font-medium',
                    record ? 'text-foreground' : 'text-muted-foreground'
                  )}>
                    {format(day, 'd')}
                  </span>
                  {record && (
                    <div className="mt-1">
                      {getStatusIcon(record.status)}
                    </div>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{format(day, 'MMMM d, yyyy')}</p>
                {record && (
                  <>
                    <p className="capitalize">{record.status}</p>
                    {record.notes && <p className="text-xs">{record.notes}</p>}
                  </>
                )}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>

      <div className="flex items-center gap-6 mt-6 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-success/20 flex items-center justify-center">
            <Check size={10} className="text-success" />
          </div>
          <span className="text-xs text-muted-foreground">Present</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-destructive/20 flex items-center justify-center">
            <X size={10} className="text-destructive" />
          </div>
          <span className="text-xs text-muted-foreground">Absent</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-warning/20 flex items-center justify-center">
            <AlertCircle size={10} className="text-warning" />
          </div>
          <span className="text-xs text-muted-foreground">Excused</span>
        </div>
      </div>
    </div>
  );
};
