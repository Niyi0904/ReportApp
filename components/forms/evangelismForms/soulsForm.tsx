import { FieldApi } from "@tanstack/react-form";
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

export function SoulFormFields({ form, index }: Props) {
  return (
    <div className="space-y-4 border rounded-lg p-4">
      {/* Name */}
      <form.Field
        name={`souls[${index}].name`}
        validators={{
          onChange: ({ value }: {value: any}) =>
            !value ? "Name is required" : undefined,
        }}
      >
        {(field: any) => (
          <div className="space-y-2">
            <Label>Name *</Label>
            <Input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Enter name"
            />
          </div>
        )}
      </form.Field>

      {/* Phone */}
      <form.Field name={`souls[${index}].phone`}>
        {(field: any) => (
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input
              value={field.state.value || ""}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Enter phone"
            />
          </div>
        )}
      </form.Field>

      {/* Address */}
      <form.Field name={`souls[${index}].address`}>
        {(field: any) => (
          <div className="space-y-2">
            <Label>Address</Label>
            <Input
              value={field.state.value || ""}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Enter address"
            />
          </div>
        )}
      </form.Field>

      {/* Gender */}
      <form.Field
        name={`souls[${index}].gender`}
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
        name={`souls[${index}].status`}
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
                <SelectItem value="saved">Saved</SelectItem>
                <SelectItem value="saved and filled">
                  Saved & Filled
                </SelectItem>
                <SelectItem value="filled">Filled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </form.Field>

      {/* Notes */}
      <form.Field name={`souls[${index}].notes`}>
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
