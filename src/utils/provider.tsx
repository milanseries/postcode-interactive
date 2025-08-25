"use client";

import { MantineProvider } from "@mantine/core";
import { ToastContainer } from "react-toastify";

export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <MantineProvider>
      {children}
      <ToastContainer hideProgressBar newestOnTop position="top-right" />
    </MantineProvider>
  );
};
