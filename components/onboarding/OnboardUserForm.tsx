"use client";

import { useForm } from "@tanstack/react-form";
import { useOnboardUser } from "@/features/onboarding/mutations";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { toast } from "sonner";
// import { generateTempPassword } from "@/features/onboarding/utils";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";


export const OnboardingForm = () => {
    const [createdMemberId, setCreatedMemberId] = useState('');
//   const admin = useSelector((state: RootState) => state.auth.user);

  const users = [
    { uid: "u1", name: "John Doe", role: "worker-in-training" },
    { uid: "u2", name: "Jane Smith", role: "worker-in-training" },
    { uid: "admin1", name: "Admin User", role: "admin" },
  ];

  const onboardUserMutation = useOnboardUser();

  const { mutate: onboardUser, isPending } = onboardUserMutation

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      gender: "male" as "male" | "female",
      dateOfBirth: "",
      churchBranch: "",
      cell: "",
      prayerGroup: "",
      dateJoined: "",
      profileImage: null as File | null,
      maritalStatus: "",
      employmentStatus: "",
      discipledBy: {
        uid: "",
        name: ""
      },
    },
    onSubmit: async ({ value }) => {
        const data = {
            email: value.email,
            profile: {
                firstName: value.firstName,
                lastName: value.lastName,
                phone: value.phone,
                address: value.address,
                gender: value.gender,
                dateOfBirth: value.dateOfBirth && value.dateOfBirth !== "" ? new Date(value.dateOfBirth) : null,
                churchBranch: value.churchBranch,
                cell: value.cell,
                prayerGroup: value.prayerGroup,
                dateJoined: value.dateJoined && value.dateJoined !== "" ? new Date(value.dateJoined) : null,
                maritalStatus: value.maritalStatus,
                employmentStatus: value.employmentStatus,
                photoUrl: value.profileImage, // ✅ SAVE URL ONLY
                discipledBy: {
                    uid: value.discipledBy.uid,
                    name: value.discipledBy.name
                }
            }
        }
        onboardUser(data, {
            onSuccess: (res: any) => {
                toast.success("Member added 🎉 Onboarding email sent");
                form.reset();
                setCreatedMemberId(res.user.uid); // optional
            },

            onError: (error: any) => {
                toast.error(error.message)
            }
        })
    },
  });

  return (
    <div>
        <form
        onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
        }}
        className="space-y-10 max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg"
        >
            {/* PROFILE PICTURE */}
            <section className="flex flex-col items-center gap-4">
            <form.Field name="profileImage">
                {(field) => (
                <>
                    <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-dashed border-gray-300">
                    {field.state.value ? (
                        <img
                        src={URL.createObjectURL(field.state.value)}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm">
                        No photo
                        </div>
                    )}
                    </div>

                    <label className="cursor-pointer text-sm font-medium text-secondary-bg">
                    Upload Profile Picture
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            field.setValue(file);
                        }
                        }}
                    />
                    </label>
                </>
                )}
            </form.Field>
            </section>

        {/* PERSONAL INFO */}
        <section className="space-y-4">
            <h3 className="font-semibold text-xl text-gray-700 border-b pb-2">
            Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <form.Field name="firstName">
                {(field) => (
                <div className="flex flex-col">
                    <label htmlFor={field.name} className="text-sm font-medium text-gray-600">
                    First Name
                    </label>
                    <Input
                    id={field.name}
                    type="text"
                    placeholder="Enter first name"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-bg"
                    />
                </div>
                )}
            </form.Field>

            {/* Last Name */}
            <form.Field name="lastName">
                {(field) => (
                <div className="flex flex-col">
                    <label htmlFor={field.name} className="text-sm font-medium text-gray-600">
                    Last Name
                    </label>
                    <Input
                    id={field.name}
                    type="text"
                    placeholder="Enter last name"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-bg"
                    />
                </div>
                )}
            </form.Field>

            {/* Email */}
            <form.Field
                name="email"
                validators={{
                onChange: ({ value }) => (!value.includes("@") ? "Invalid email" : undefined),
                }}
            >
                {(field) => (
                <div className="flex flex-col">
                    <label htmlFor={field.name} className="text-sm font-medium text-gray-600">
                    Email
                    </label>
                    <Input
                    id={field.name}
                    type="email"
                    placeholder="Enter email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-bg"
                    />
                    {field.state.meta.errors && (
                    <p className="text-red-500 text-sm mt-1">{field.state.meta.errors}</p>
                    )}
                </div>
                )}
            </form.Field>

            {/* Phone */}
            <form.Field name="phone">
                {(field) => (
                <div className="flex flex-col">
                    <label htmlFor={field.name} className="text-sm font-medium text-gray-600">
                    Phone
                    </label>
                    <Input
                    id={field.name}
                    type="tel"
                    placeholder="Enter phone number"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-bg"
                    />
                </div>
                )}
            </form.Field>

            {/* Gender */}
            <form.Field name="gender">
                {(field) => (
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600">Gender</label>
                    <Select
                    value={field.state.value}
                    onValueChange={(value) => field.setValue(value as "male" | "female")}
                    >
                    <SelectTrigger className="mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-bg">
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

            {/* Date of Birth */}
            <form.Field name="dateOfBirth">
                {(field) => (
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                    <Input
                    type="date"
                    value={field.state.value}
                    onChange={(e) => field.setValue(e.target.value)}
                    className="mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-bg"
                    />
                </div>
                )}
            </form.Field>

            {/* Address */}
            <form.Field name="address">
                {(field) => (
                <div className="flex flex-col md:col-span-2">
                    <label htmlFor={field.name} className="text-sm font-medium text-gray-600">
                    Address
                    </label>
                    <Input
                    id={field.name}
                    type="text"
                    placeholder="Enter address"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-bg"
                    />
                </div>
                )}
            </form.Field>
            </div>
        </section>

        {/* CHURCH INFO */}
        <section className="space-y-4">
            <h3 className="font-semibold text-xl text-gray-700 border-b pb-2">Church Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Church Branch */}
            <form.Field name="churchBranch">
                {(field) => (
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600">Branch</label>
                    <Select
                    value={field.state.value}
                    onValueChange={(value) => field.setValue(value)}
                    >
                    <SelectTrigger className="mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-bg">
                        <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="yaba">Yaba</SelectItem>
                        <SelectItem value="ikoyi">Ikoyi</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                )}
            </form.Field>

            {/* Cell */}
            <form.Field name="cell">
                {(field) => (
                <div className="flex flex-col">
                    <label htmlFor={field.name} className="text-sm font-medium text-gray-600">
                    Cell
                    </label>
                    <Input
                    id={field.name}
                    type="text"
                    placeholder="e.g. Fadeyi Cell 2"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-bg"
                    />
                </div>
                )}
            </form.Field>

            {/* Prayer Group */}
            <form.Field name="prayerGroup">
                {(field) => (
                <div className="flex flex-col">
                    <label htmlFor={field.name} className="text-sm font-medium text-gray-600">
                    Prayer Group
                    </label>
                    <Input
                    id={field.name}
                    type="text"
                    placeholder="Enter prayer group"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-bg"
                    />
                </div>
                )}
            </form.Field>

            {/* Date Joined */}
            <form.Field name="dateJoined">
                {(field) => (
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600">Date Joined</label>
                    <Input
                    type="date"
                    value={field.state.value}
                    onChange={(e) => field.setValue(e.target.value)}
                    className="mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-bg"
                    />
                </div>
                )}
            </form.Field>

            {/* Marital Status */}
            <form.Field name="maritalStatus">
                {(field) => (
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600">Marital Status</label>
                    <Select
                    value={field.state.value}
                    onValueChange={(value) => field.setValue(value)}
                    >
                    <SelectTrigger className="mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-bg">
                        <SelectValue placeholder="Select marital status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                )}
            </form.Field>

            {/* Employment Status */}
            <form.Field name="employmentStatus">
                {(field) => (
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600">Employment Status</label>
                    <Select
                    value={field.state.value}
                    onValueChange={(value) => field.setValue(value)}
                    >
                    <SelectTrigger className="mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-bg">
                        <SelectValue placeholder="Select employment status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="employed">Employed</SelectItem>
                        <SelectItem value="unemployed">Unemployed</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="retired">Retired</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                )}
            </form.Field>
            </div>
        </section>

        {/* DISCIPLESHIP */}
        <section className="space-y-4">
            <h3 className="font-semibold text-xl text-gray-700 border-b pb-2">Discipleship</h3>

            <form.Field name="discipledBy">
            {(field) => (
                <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">Discipler</label>
                <Select
                    value={field.state.value.uid}
                    onValueChange={(uid) => {
                    const selectedUser = users.find((u) => u.uid === uid);
                    if (selectedUser) {
                        field.setValue({ uid: selectedUser.uid, name: selectedUser.name });
                    }
                    }}
                >
                    <SelectTrigger className="mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-bg">
                    <SelectValue placeholder="Select a discipler" />
                    </SelectTrigger>
                    <SelectContent>
                    {users.map((user) => (
                        <SelectItem key={user.uid} value={user.uid}>
                        {user.name} ({user.role})
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                </div>
            )}
            </form.Field>
        </section>

        {/* SUBMIT BUTTON */}
        <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-secondary-bg text-white py-3 rounded-lg font-semibold hover:bg-secondary-bg/90 transition"
        >
            {isPending ? (
            <span className="flex items-center gap-2 justify-center">
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating...
            </span>
            ) : (
            "Create Member"
            )}
        </Button>
        </form>

        {createdMemberId && (
            <div className="mt-4 p-4 rounded-lg bg-green-50 text-green-700">
                Member created successfully.
                <button
                // onClick={() => router.push(`/admin/members/${createdMemberId}`)}
                className="ml-2 underline font-medium"
                >
                View profile
                </button>
            </div>
        )}
    </div>

  );
};
