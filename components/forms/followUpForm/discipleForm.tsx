import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  form: any;
  index: number;
};

export function DiscipleFormFields({ form, index }: Props) {
  return (
    <div className="space-y-4 border rounded-lg p-4">
      {/* Name */}
      <form.Field
        name={`disciples[${index}].discipleName`}
        validators={{
          onChange: ({ value }: {value: any}) =>
            !value ? "Disciple name is required" : undefined,
        }}
      >
        {(field: any) => (
          <div className="space-y-2">
            <Label>Disciple Name *</Label>
            <Input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Select or Enter a disciple name"
            />
          </div>
        )}
      </form.Field>

      {/* Address */}
      <form.Field 
        name={`disciples[${index}].topic`}
        validators={{
          onChange: ({ value }: {value: any}) =>
            !value ? "Topic is required" : undefined,
        }}
      >
        {(field: any) => (
          <div className="space-y-2">
            <Label>Topic Taught *</Label>
            <Input
              value={field.state.value || ""}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Enter topic taught"
            />
          </div>
        )}
      </form.Field>

        {/* Duration */}
      <form.Field
        name={`disciples[${index}].duration`}
        validators={{
          onChange: ({ value }: {value: any}) =>
            !value ? "Duration is required" : undefined,
        }}
      >
        {(field: any) => (
          <div className="space-y-2">
            <Label>Duration *</Label>
            <Input
              value={field.state.value || ""}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Enter duration"
            />
          </div>
        )}
      </form.Field>

      {/* Gender */}
      <form.Field
        name={`disciples[${index}].gender`}
        validators={{
          onChange: ({ value }: {value: any}) =>
            !value ? "Gender is required" : undefined,
        }}
      >
        {(field: any) => (
          <div className="space-y-2">
            <Label>Gender *</Label>
            <Select
              value={field.state.value}
              onValueChange={field.handleChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
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
      <form.Field
        name={`disciples[${index}].status`}
        validators={{
          onChange: ({ value }: {value: any}) =>
            !value ? "Status is required" : undefined,
        }}
      >
        {(field: any) => (
          <div className="space-y-2">
            <Label>Status *</Label>
            <Select
              value={field.state.value}
              onValueChange={field.handleChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="receptive">Receptive</SelectItem>
                <SelectItem value="none-receptive">
                  Non-receptive
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </form.Field>

      {/* Notes */}
      <form.Field name={`disciples[${index}].notes`}>
        {(field: any) => (
          <div className="space-y-2">
            <Label>Notes</Label>
            <Textarea
              value={field.state.value || ""}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Notes for self"
              rows={3}
            />
          </div>
        )}
      </form.Field>
    </div>
  );
}
