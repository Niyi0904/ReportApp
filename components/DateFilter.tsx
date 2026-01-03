import { useState, useEffect } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface DateFilterProps {
  value?: Date;
  onDateChange?: (date: Date | undefined) => void;
  onMonthChange?: (monthKey: string) => void;
  showMonthFilter?: boolean;
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const DateFilter = ({ value, onDateChange, onMonthChange, showMonthFilter = true }: DateFilterProps) => {
  const [date, setDate] = useState<Date | undefined>(value);
  const [monthIndex, setMonthIndex] = useState<number | undefined>();

  useEffect(() => {
    if (value) setDate(value);
  }, [value]);

  const handleMonthChange = (newMonthName: string) => {
    const index = months.indexOf(newMonthName);
    if (index === -1) return;
    setMonthIndex(index);

    const now = new Date();
    const key = `${now.getFullYear()}-${String(index + 1).padStart(2, "0")}`;
    onMonthChange?.(key);
  };

  return (
    <div className="flex items-center gap-3">
      {showMonthFilter && (
        <Select
          value={monthIndex !== undefined ? months[monthIndex] : ""}
          onValueChange={handleMonthChange}
        >
          <SelectTrigger
            className={cn(
              "w-44 px-3 py-2 rounded-lg text-primary bg-background border border-border hover:bg-muted focus:ring-2 focus:ring-primary transition-colors"
            )}
          >
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent className="bg-background text-primary">
            {months.map((m) => (
              <SelectItem key={m} value={m} className="hover:bg-primary/10">
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};




// import { useState, useEffect } from "react";
// import { Calendar as CalendarIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { cn } from "@/lib/utils";

// interface DateFilterProps {
//   value?: Date;
//   onDateChange?: (date: Date | undefined) => void;
//   onMonthChange?: (monthKey: string) => void;
//   showMonthFilter?: boolean;
// }

// const months = [
//   "January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"
// ];

// export const DateFilter = ({ value, onDateChange, onMonthChange, showMonthFilter = true }: DateFilterProps) => {
//   const [date, setDate] = useState<Date | undefined>(value);
//   const [monthIndex, setMonthIndex] = useState<number | undefined>();

//   useEffect(() => {
//     if (value) setDate(value);
//   }, [value]);

//   const currentMonth = new Date().getMonth(); // 0-based index (0 = January)

//   // Only past and current months
//   const availableMonths = months.slice(0, currentMonth + 1);

//   const handleMonthChange = (newMonthName: string) => {
//     const index = months.indexOf(newMonthName);
//     if (index === -1) return;
//     setMonthIndex(index);

//     const now = new Date();
//     const key = `${now.getFullYear()}-${String(index + 1).padStart(2, "0")}`;
//     onMonthChange?.(key);
//   };

//   return (
//     <div className="flex items-center gap-3">
//       {showMonthFilter && (
//         <Select
//           value={monthIndex !== undefined ? months[monthIndex] : ""}
//           onValueChange={handleMonthChange}
//         >
//           <SelectTrigger
//             className={cn(
//               "w-44 px-3 py-2 rounded-lg text-primary bg-background border border-border hover:bg-muted focus:ring-2 focus:ring-primary transition-colors"
//             )}
//           >
//             <SelectValue placeholder="Select month" />
//           </SelectTrigger>
//           <SelectContent className="bg-background text-primary">
//             {availableMonths.map((m) => (
//               <SelectItem key={m} value={m} className="hover:bg-primary/10">
//                 {m}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       )}
//     </div>
//   );
// };


