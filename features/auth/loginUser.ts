import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/auth"; // your client-side Firebase
import { AppDispatch } from "@/app/redux/store";
import { loginStart, loginSuccess, loginFailure } from "@/app/redux/features/auth/authSlice";
import createSession from "@/lib/apis/api-session";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase/firestore"; // your Firestore setup


interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = (payload: LoginPayload, dispatch: AppDispatch) => {
    dispatch(loginStart());
  
    signInWithEmailAndPassword(auth, payload.email, payload.password)
      .then(async (userCredential) => {
        const user = userCredential.user;

            // Fetch additional user data (like status) from Firestore
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        const status = docSnap.exists() ? docSnap.data().status : "member";

        dispatch(
          loginSuccess({
            uid: user.uid,
            email: user.email || "",
            displayName: user.displayName || "",
            photoURL: user.photoURL || "",
            status
          })
        );
        await createSession();
      })
      .catch((error) => {
        dispatch(loginFailure(error.message));
      });
};
