"use client";

import { useUserProfile } from "@/features/profile/queries";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileSection } from "@/components/profile/ProfileSection";
import { EditableField } from "@/components/profile/EditableField";
import { ReadOnlyField } from "@/components/profile/ReadOnlyField";
import { formatDate } from "@/lib/utils";
import { LoadingState } from "@/components/LoadingState";

export default function ProfilePage() {
  const { data: user, isLoading, error } = useUserProfile();

  if (isLoading) return  <LoadingState message="Loading profile..." />
   if (error) return <div>Error loading profile</div>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl space-y-10">
      <ProfileHeader user={user} />

      {/* PERSONAL INFO */}
      <ProfileSection title="Personal Information">
        <EditableField label="First Name" field="firstName" value={user.profile.firstName} />
        <EditableField label="Last Name" field="lastName" value={user.profile.lastName} />
        <EditableField label="Phone" field="phone" value={user.profile.phone} />
        <EditableField label="Address" field="address" value={user.profile.address} />
        <EditableField
            label="Marital Status"
            field="maritalStatus"
            value={user.profile.maritalStatus}
            type="select"
            options={[
                { label: "Single", value: "single" },
                { label: "Married", value: "married" },
                { label: "Divorced", value: "divorced" },
                { label: "Widowed", value: "widowed" },
            ]}
        />
        <EditableField
            label="Employment Status"
            field="employmentStatus"
            value={user.profile.employmentStatus}
            type="select"
            options={[
                { label: "Employed", value: "employed" },
                { label: "Unemployed", value: "unemployed" },
                { label: "Student", value: "student" },
                { label: "Retired", value: "retired" },
            ]}
        />

      </ProfileSection>

      {/* CHURCH INFO */}
      <ProfileSection title="Church Information">
        <ReadOnlyField label="Branch" value={user.profile.churchBranch} />
        <ReadOnlyField label="Cell" value={user.profile.cell} />
        <ReadOnlyField label="Prayer Group" value={user.profile.prayerGroup} />
        <ReadOnlyField label="Date Joined" value={formatDate(user.profile.dateJoined)} />
      </ProfileSection>

      {/* DISCIPLESHIP */}
      <ProfileSection title="Discipleship">
        <ReadOnlyField label="Discipled By" value={user.profile.discipledBy?.name || "—"} />
      </ProfileSection>
    </div>
  );
}
