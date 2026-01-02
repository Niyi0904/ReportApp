import { getAuth } from "firebase/auth";

const auth = getAuth();

export default async function createSession() {
  const idToken = await auth.currentUser?.getIdToken();

  await fetch("/api/auth/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idToken }),
  });
}
