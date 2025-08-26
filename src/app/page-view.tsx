"use client";

import { SourceForm } from "@/components/source-form/source-form";
import { VerifierForm } from "@/components/verifier-form/verifier-form";
import { useTabStore } from "@/store/use-tab-store";
import { Tabs, TabsList, TabsTab, Box, TabsPanel } from "@mantine/core";
import { useLayoutEffect, useState } from "react";

export const PageView = () => {
  const { setActiveTab } = useTabStore();
  const [active, setActive] = useState<string | null>("");
  const getCurrentState = useTabStore.getState().activeTab;

  useLayoutEffect(() => {
    setActive(getCurrentState);
  }, [getCurrentState]);

  return (
    <Tabs onChange={setActiveTab} value={active}>
      <TabsList>
        <TabsTab value="verifier">Verifier</TabsTab>
        <TabsTab value="source">Source</TabsTab>
      </TabsList>

      <Box mt="sm">
        <TabsPanel value="verifier">
          <VerifierForm />
        </TabsPanel>
        <TabsPanel value="source">
          <SourceForm />
        </TabsPanel>
      </Box>
    </Tabs>
  );
};
