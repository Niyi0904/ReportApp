"use client";

import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
import { store } from "../app/redux/store";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { Toaster } from "./ui/sonner";
import SessionRestorer from "./sessionRestorer";


export default function ClientProviders({children}: { children: React.ReactNode;}) {
const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <SessionRestorer />
          {/* <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate> */}
          {children}
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
