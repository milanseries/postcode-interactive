import { SourceInput } from "@/components/source-form/use-source-form";
import { VerifierInput } from "@/components/verifier-form/use-verifier-form";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface TabStore {
  activeTab: string | null;
  verifierData: VerifierInput;
  sourceData: SourceInput;
  setActiveTab: (tab: string | null) => void;
  updateVerifierData: (newData: Partial<VerifierInput>) => void;
  updateSourceData: (newData: Partial<SourceInput>) => void;
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
