import { OnboardUserPayload } from "./types";
import { uploadProfileImage } from "@/lib/uploadImage";


export async function onboardUser(data: OnboardUserPayload) {
  let photoUrl = null;

  if (data.profile.photoUrl) {
    const uploadRes = await uploadProfileImage(data.profile.photoUrl);
    photoUrl = uploadRes.data.url;
  }

  const payload = {
    email: data.email,
    profile: {
      ...data.profile,
      displayName: `${data.profile.firstName} ${data.profile.lastName}`,
      photoUrl,
    },
  };

  const res = await fetch("/api/admin/onboard", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }

  return res.json();
}
