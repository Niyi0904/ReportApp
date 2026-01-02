"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { loginSuccess } from "@/app/redux/features/auth/authSlice";

export default function SessionRestorer() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user) {
      fetch("/api/auth/verify-session")
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            dispatch(loginSuccess(data.user));
          }
        })
        .catch(() => {});
    }
  }, [user, dispatch]);

  return null;
}