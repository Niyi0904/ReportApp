import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { SoulFormFields } from "./soulsForm";
import { Plus, Trash } from "lucide-react";
import { useAddEvangelism } from "@/features/evangelism/mutations";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";


export function EvangelismForm({ onSuccess }: { onSuccess: () => void }) {
    const user = useSelector((state: RootState) => state.auth.user);
    const addEvangelismMutation = useAddEvangelism(user?.uid as string);

    const {mutate: addEvangelism, isPending: addingEvangelism, } = addEvangelismMutation

  const form = useForm({
    defaultValues: {
      evangelismDate: new Date(),
      souls: [
        {
          name: "",
          phone: "",
          address: "",
          gender: "male" as "male" | "female",
          status: "saved" as "saved" | "saved and filled" | "filled",
          notes: "",
        },
      ],
    },
    onSubmit: async ({ value }) => {
      addEvangelism(value, {
        onSuccess: (res) => {
            toast.success("Evangelism added successfully 🎉.")
            onSuccess();
            form.reset();

            console.log(res)
        },

        onError: (error) => {
            toast.error(error.message)
        }
      })
      
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      {/* Evangelism Date */}
      <form.Field name="evangelismDate">
        {(field: any) => (
          <div className="space-y-2">
            <Label>Evangelism Date</Label>
            <Input
              type="date"
              value={field.state.value.toISOString().split("T")[0]}
              onChange={(e) =>
                field.handleChange(new Date(e.target.value))
              }
            />
          </div>
        )}
      </form.Field>

        <form.Field name="souls" mode="array">
            {(field) => {
                const souls = Array.isArray(field.state.value)
                ? field.state.value
                : [];

                return (
                <>
                    {souls.map((_, index) => (
                    <div key={index} className="relative">
                        <SoulFormFields form={form} index={index} />

                        {souls.length > 1 && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute top-1 text-red-400 right-2"
                            onClick={() => field.removeValue(index)}
                        >
                            <Trash size={16} />
                        </Button>
                        )}
                    </div>
                    ))}

                    <Button
                        type="button"
                        variant="outline"
                        className="w-full gap-2"
                        onClick={() =>
                            field.pushValue({
                            name: "",
                            phone: "",
                            address: "",
                            gender: "male",
                            status: "saved",
                            notes: "",
                            })
                        }
                    >
                        <Plus size={18} /> Add Another Soul
                    </Button>
                </>
                );
            }}
        </form.Field>

      <Button type="submit" disabled={addingEvangelism} className="w-full bg-secondary-bg hover:bg-secondary-bg/90">
        {addingEvangelism ? "Adding..." : "Save Evangelism"}
      </Button>
    </form>
  );
}
