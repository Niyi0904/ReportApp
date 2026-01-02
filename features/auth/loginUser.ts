import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/auth";
import { AppDispatch } from "@/app/redux/store";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "@/app/redux/features/auth/authSlice";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";
import createSession from "@/lib/apis/api-session";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";

interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = async (
  payload: LoginPayload,
  dispatch: AppDispatch,
  router: AppRouterInstance
) => {
  try {
    dispatch(loginStart());

    // 1️⃣ Sign in first
    const userCredential = await signInWithEmailAndPassword(
      auth,
      payload.email,
      payload.password
    );

    const user = userCredential.user;

    // 2️⃣ Fetch extra user data
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    const status = docSnap.exists() ? docSnap.data().status : "member";
    const data = docSnap.exists() ? docSnap.data() : {};

    // 4️⃣ Create session (now auth.currentUser exists)
    await createSession().catch(console.error);

    toast.success("Login succssful🎉. Redirecting to dashboard");
    // 3️⃣ Update Redux
    dispatch(
      loginSuccess({
        uid: user.uid,
        email: user.email || "",
        displayName: data.displayName || "",
        photoURL: data.photoUrl || "",
        status,
      })
    );

    // 5️⃣ Redirect immediately
    router.replace("/dashboard");

  } catch (error: any) {
    dispatch(loginFailure(error.message));
  }
};
