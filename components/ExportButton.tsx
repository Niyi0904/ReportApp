import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ExportButtonProps {
  data: any[];
  filename: string;
  headers: string[];
}

export const ExportButton = ({ data, filename, headers }: ExportButtonProps) => {
  const exportToCSV = () => {
    if (data.length === 0) {
      toast.error('No data to export');
      return;
    }

    const csvContent = [
      headers.join(','),
      ...data.map((row) =>
        headers.map((header) => {
          const key = header.toLowerCase().replace(/\s+/g, '');
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
    
    toast.success('Export successful!');
  };

  return (
    <Button variant="outline" onClick={exportToCSV} className="gap-2">
      <Download size={16} />
      Export to Excel
    </Button>
  );
};
