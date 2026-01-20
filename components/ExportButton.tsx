import { Download, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ExportButtonProps {
  data: any[];
  filename: string;
  headers: string[];
  className?: string; // Added for flexible positioning
}

export const ExportButton = ({ data, filename, headers, className }: ExportButtonProps) => {
  const exportToCSV = () => {
    if (data.length === 0) {
      toast.error('No data found to export');
      return;
    }

    try {
      const csvContent = [
        headers.join(','),
        ...data.map((row) =>
          headers.map((header) => {
            // Updated mapping logic to be more robust
            const key = header.toLowerCase().replace(/[- ]/g, ''); 
            const value = row[key] ?? '';
            return `"${String(value).replace(/"/g, '""')}"`;
          }).join(',')
        ),
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      URL.revokeObjectURL(link.href);
      
      toast.success('Report downloaded successfully');
    } catch (error) {
      toast.error('Failed to generate export');
    }
  };

  return (
    <Button 
      variant="ghost" 
      onClick={exportToCSV} 
      className={cn(
        "h-10 px-4 gap-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent hover:border-border transition-all duration-200 rounded-xl",
        className
      )}
    >
      <FileSpreadsheet size={18} className="text-emerald-600/70" />
      <span className="hidden sm:inline font-medium">Export Excel</span>
      <span className="sm:hidden font-medium text-xs">Export</span>
    </Button>
  );
};