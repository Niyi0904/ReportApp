import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { DiscipleFormFields } from "./discipleForm";
import { Plus, Trash } from "lucide-react";
import { useAddEvangelism } from "@/features/evangelism/mutations";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useAddFollowUp } from "@/features/followUp/mutations";


export function FollowUpForm({ onSuccess }: { onSuccess: () => void }) {
    const user = useSelector((state: RootState) => state.auth.user);
    const addFollowUpMutation = useAddFollowUp(user?.uid as string);

    const {mutate: addFollowUp, isPending: addingFollowUp, } = addFollowUpMutation

  const form = useForm({
    defaultValues: {
      followUpDate: new Date(),
      disciples: [
        {
          discipleName: "",
          topic: "",
          duration: "",
          gender: "male" as "male" | "female",
          status: "receptive" as "receptive" | "non-receptive",
          notes: "",
        },
      ],
    },
    onSubmit: async ({ value }) => {
      addFollowUp(value, {
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
      <form.Field name="followUpDate">
        {(field: any) => (
          <div className="space-y-2">
            <Label>Follow-up Date</Label>
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

        <form.Field name="disciples" mode="array">
        {(field) => {
          const souls = Array.isArray(field.state.value) ? field.state.value : [];

          return (
            <div className="space-y-6">
              {souls.map((_, index) => (
                <div key={index} className="relative group animate-in slide-in-from-top-2 duration-300">
                  <DiscipleFormFields form={form} index={index} />

                  {souls.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full h-8 w-8"
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
                className="w-full h-12 border-dashed border-2 hover:bg-muted/50 gap-2 text-muted-foreground transition-all"
                onClick={() =>
                  field.pushValue({
                    discipleName: "",
                    topic: "",
                    duration: "",
                    gender: "male",
                    status: "receptive",
                    notes: "",
                  })
                }
              >
                <Plus size={18} /> Add Another Disciple
              </Button>
            </div>
          );
        }}
      </form.Field>

      <Button type="submit" disabled={addingFollowUp} className="w-full bg-secondary-bg hover:bg-secondary-hover">
        {addingFollowUp ? "Adding..." : "Save Follow-Up"}
      </Button>
    </form>
  );
}






// import { useForm } from "@tanstack/react-form";
// import { Button } from "@/components/ui/button";
// import { DiscipleFormFields } from "./discipleForm";
// import { Plus, Trash } from "lucide-react";
// import { useAddEvangelism } from "@/features/evangelism/mutations";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { toast } from "sonner";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "@/app/redux/store";
// import { useAddFollowUp } from "@/features/followUp/mutations";


// export function FollowUpForm({ onSuccess }: { onSuccess: () => void }) {
//     const user = useSelector((state: RootState) => state.auth.user);
//     const addFollowUpMutation = useAddFollowUp(user?.uid as string);

//     const {mutate: addFollowUp, isPending: addingFollowUp, } = addFollowUpMutation

//   const form = useForm({
//     defaultValues: {
//       followUpDate: new Date(),
//       disciples: [
//         {
//           discipleName: "",
//           topic: "",
//           duration: "",
//           gender: "male" as "male" | "female",
//           status: "receptive" as "receptive" | "non-receptive",
//           notes: "",
//         },
//       ],
//     },
//     onSubmit: async ({ value }) => {
//       addFollowUp(value, {
//         onSuccess: (res) => {
//             toast.success("Evangelism added successfully 🎉.")
//             onSuccess();
//             form.reset();

//             console.log(res)
//         },

//         onError: (error) => {
//             toast.error(error.message)
//         }
//       })
      
//     },
//   });

//   return (
//     <form
//       onSubmit={(e) => {
//         e.preventDefault();
//         form.handleSubmit();
//       }}
//       className="space-y-6"
//     >
//       {/* Evangelism Date */}
//       <form.Field name="followUpDate">
//         {(field: any) => (
//           <div className="space-y-2">
//             <Label>Follow-up Date</Label>
//             <Input
//               type="date"
//               value={field.state.value.toISOString().split("T")[0]}
//               onChange={(e) =>
//                 field.handleChange(new Date(e.target.value))
//               }
//             />
//           </div>
//         )}
//       </form.Field>

//         <form.Field name="disciples" mode="array">
//             {(field) => {
//                 const souls = Array.isArray(field.state.value)
//                 ? field.state.value
//                 : [];

//                 return (
//                 <>
//                     {souls.map((_, index) => (
//                     <div key={index} className="relative">
//                         <DiscipleFormFields form={form} index={index} />

//                         {souls.length > 1 && (
//                         <Button
//                             type="button"
//                             variant="ghost"
//                             size="icon"
//                             className="absolute top-1 text-red-400 right-2"
//                             onClick={() => field.removeValue(index)}
//                         >
//                             <Trash size={16} />
//                         </Button>
//                         )}
//                     </div>
//                     ))}

//                     <Button
//                         type="button"
//                         variant="outline"
//                         className="w-full gap-2"
//                         onClick={() =>
//                             field.pushValue({
//                             discipleName: "",
//                             topic: "",
//                             duration: "",
//                             gender: "male" as "male" | "female",
//                             status: "receptive" as "receptive" | "non-receptive",
//                             notes: "",
//                             })
//                         }
//                     >
//                         <Plus size={18} /> Add Another Disciples
//                     </Button>
//                 </>
//                 );
//             }}
//         </form.Field>

//       <Button type="submit" disabled={addingFollowUp} className="w-full bg-secondary-bg hover:bg-secondary-bg/90">
//         {addingFollowUp ? "Adding..." : "Save Follow-Up"}
//       </Button>
//     </form>
//   );
// }
