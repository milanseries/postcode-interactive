"use client";

import { MantineProvider } from "@mantine/core";

export const Providers = ({ children }: React.PropsWithChildren) => {
  return <MantineProvider>{children}</MantineProvider>;
};
