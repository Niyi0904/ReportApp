"use client";

import { useRef, useState } from "react";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import { uploadProfileImage } from "@/lib/uploadImage";
import { useUpdateProfileField } from "@/features/profile/mutations";

export const ProfileHeader = ({ user }: { user: any }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const mutation = useUpdateProfileField();
  

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

    const handleImageChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploading(true);

            // 1️⃣ Upload image
            const uploadRes = await uploadProfileImage(file);
            const photoUrl = uploadRes.data.url;

            // 2️⃣ Update profile
            await mutation.mutateAsync({
            field: "photoUrl",
            value: photoUrl,
            });

            toast.success("Profile picture updated");
        } catch (error: any) {
            toast.error(error.message || "Failed to update profile picture");
        } finally {
            setUploading(false);
        }
    };


  return (
    <div className="flex items-center gap-6">
      {/* AVATAR */}
      <div
        className="relative w-28 h-28 cursor-pointer group"
        onClick={handleImageClick}
      >
        <img
          src={user.profile.photoUrl || "/avatar.png"}
          className="w-28 h-28 rounded-full object-cover border"
        />

        {/* Overlay */}
        <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <Camera className="text-white w-6 h-6" />
        </div>

        {uploading && (
          <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center text-white text-sm">
            Uploading...
          </div>
        )}
      </div>

      {/* Hidden input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />

      {/* INFO */}
      <div>
        <h2 className="text-2xl font-semibold">
          {user.profile.firstName} {user.profile.lastName}
        </h2>
        <p className="text-gray-500 capitalize">{user.status}</p>
        <p className="text-sm text-gray-400">{user.email}</p>
      </div>
    </div>
  );
};
