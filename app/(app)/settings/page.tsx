"use client";

import { SettingsSection } from "@/components/settings/SettingsSection";
import { ToggleSetting } from "@/components/settings/ToggleSetting";
import { ActionButton } from "@/components/settings/ActionButton";
import { useUserProfile } from "@/features/profile/queries";
import { ReadOnly } from "@/components/settings/ReadOnly";
import { useState } from "react";
import { toast } from "sonner";

export default function SettingsPage() {
    const [sending, setSending] = useState(false);
    const { data: user } = useUserProfile();
    
    if (!user) return null;


    const handlePasswordReset = async () => {
        try {
            setSending(true);

            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
            });

            const data = await res.json();

            if (!res.ok) {
            throw new Error(data.error || "Something went wrong");
            }

            toast.success("Password reset link sent to your email 📧");
        } catch (error: any) {
            toast.error(error.message || "Failed to send reset email");
        } finally {
            setSending(false);
        }
    };

  

  return (
    <div className="max-w-3xl bg-white rounded-xl mx-auto p-4 md:p-8 space-y-10">
      <h1 className="text-2xl font-semibold">Settings</h1>

      {/* ACCOUNT */}
      <SettingsSection title="Account">
        <ReadOnly label="Email" value={user.email} />
        <ActionButton
          label="Change Password"
          description="We’ll send you a password reset email"
          onClick={handlePasswordReset}
          disabled={sending}
        />
      </SettingsSection>

      {/* PREFERENCES */}
      <SettingsSection title="Preferences">
        <ToggleSetting
          label="Dark Mode"
          description="Switch between light and dark theme"
        />
        <ToggleSetting
          label="Email Notifications"
          description="Receive important email updates"
        />
      </SettingsSection>

      {/* SECURITY */}
      <SettingsSection title="Security">
        <ActionButton
          label="Logout All Sessions"
          description="Log out from all devices"
          onClick={() => fetch("/api/auth/logout-all")}
        />
      </SettingsSection>

      {/* DANGER ZONE */}
      <SettingsSection title="Danger Zone" danger>
        <ActionButton
          label="Deactivate Account"
          description="Temporarily disable your account"
          danger
          onClick={() => fetch("/api/account/deactivate")}
        />
      </SettingsSection>
    </div>
  );
}
