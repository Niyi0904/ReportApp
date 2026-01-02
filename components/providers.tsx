"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../app/redux/store";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { Toaster } from "./ui/sonner";
import SessionListener from "./sessionListener";
// import SessionRestorer from "./sessionRestorer";


export default function ClientProviders({children}: { children: React.ReactNode;}) {
const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
          <SessionListener/>
            {children}
          </PersistGate>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
