"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";
import { loginSuccess, loginFailure } from "@/app/redux/features/auth/authSlice";

export default function SessionListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          const status = docSnap.exists() ? docSnap.data().status : "member";
          const data = docSnap.exists() ? docSnap.data() : {};

          dispatch(
            loginSuccess({
              uid: user.uid,
              email: user.email || "",
              displayName: data.displayName || "",
              photoURL: data.photoUrl || "",
              status,
            })
          );
        }
      } catch (error) {
        dispatch(loginFailure("Failed to restore session")); 
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
}
