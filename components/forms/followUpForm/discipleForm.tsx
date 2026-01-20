import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Clock, User } from "lucide-react";

type Props = {
  form: any;
  index: number;
};

export function DiscipleFormFields({ form, index }: Props) {
  return (
    <div className="space-y-5 border border-border/60 bg-card/50 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-6 w-1 bg-[#634832] rounded-full" />
        <span className="text-xs font-bold uppercase tracking-tighter text-foreground/70">
          Disciple Entry #{index + 1}
        </span>
      </div>

      {/* Disciple Name */}
      <form.Field name={`disciples[${index}].discipleName`}>
        {(field: any) => (
          <div className="space-y-2">
            <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
              Disciple Name *
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50" size={18} />
              <Input
                className="pl-10 h-11 bg-muted/20 border-none focus-visible:ring-1"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Search or enter name"
              />
            </div>
          </div>
        )}
      </form.Field>

      {/* Topic Taught */}
      <form.Field name={`disciples[${index}].topic`}>
        {(field: any) => (
          <div className="space-y-2">
            <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
              Topic Taught *
            </Label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50" size={18} />
              <Input
                className="pl-10 h-11 bg-muted/20 border-none focus-visible:ring-1"
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="e.g. Salvation, Prayer..."
              />
            </div>
          </div>
        )}
      </form.Field>

      {/* Grid for Small Fields */}
      <div className="grid grid-cols-2 gap-4">
        {/* Gender */}
        <form.Field name={`disciples[${index}].gender`}>
          {(field: any) => (
            <div className="space-y-2">
              <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Gender</Label>
              <Select value={field.state.value} onValueChange={field.handleChange}>
                <SelectTrigger className="h-11 bg-muted/20 border-none">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </form.Field>

        {/* Status */}
        <form.Field name={`disciples[${index}].status`}>
          {(field: any) => (
            <div className="space-y-2">
              <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Outcome</Label>
              <Select value={field.state.value} onValueChange={field.handleChange}>
                <SelectTrigger className="h-11 bg-muted/20 border-none">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="receptive">Receptive</SelectItem>
                  <SelectItem value="non-receptive">Non-receptive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </form.Field>
      </div>

      {/* Duration */}
      <form.Field name={`disciples[${index}].duration`}>
        {(field: any) => (
          <div className="space-y-2">
            <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
              Duration (mins)
            </Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50" size={18} />
              <Input
                className="pl-10 h-11 bg-muted/20 border-none focus-visible:ring-1"
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="e.g. 30"
              />
            </div>
          </div>
        )}
      </form.Field>

      {/* Notes */}
      <form.Field name={`disciples[${index}].notes`}>
        {(field: any) => (
          <div className="space-y-2">
            <Label className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Notes</Label>
            <Textarea
              className="bg-muted/20 border-none focus-visible:ring-1 min-h-25 resize-none"
              value={field.state.value || ""}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Any specific observations..."
            />
          </div>
        )}
      </form.Field>
    </div>
  );
}