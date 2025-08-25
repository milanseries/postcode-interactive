import { sourceInputSchema } from "@/components/source-input";
import { schema } from "@/components/verifier-form";
import z from "zod";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface TabStore {
  activeTab: string | null;
  verifierData: z.infer<typeof schema>;
  sourceData: z.infer<typeof sourceInputSchema>;
  setActiveTab: (tab: string | null) => void;
  updateVerifierData: (newData: Partial<z.infer<typeof schema>>) => void;
  updateSourceData: (newData: Partial<z.infer<typeof sourceInputSchema>>) => void;
  clearStore: () => void;
}

export const useTabStore = create<TabStore>()(
  persist(
    (set) => ({
      activeTab: "verifier",
      verifierData: { postcode: "", state: "", suburb: "" },
      sourceData: { query: "" },
      setActiveTab: (tab) => set({ activeTab: tab }),
      updateVerifierData: (newData) =>
        set((state) => ({ verifierData: { ...state.verifierData, ...newData } })),
      updateSourceData: (newData) =>
        set((state) => ({ sourceData: { ...state.sourceData, ...newData } })),
      clearStore: () =>
        set({
          activeTab: "verifier",
          verifierData: { postcode: "", state: "", suburb: "" },
          sourceData: { query: "" },
        }),
    }),
    {
      name: "tab-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
