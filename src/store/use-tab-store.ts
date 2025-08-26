import { SourceInput } from "@/components/source/use-source-form";
import { VerifierInput } from "@/components/verifier/use-verifier-form";
import { SearchLocationsQuery } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface TabStore {
  activeTab: string | null;
  verifierData: VerifierInput;
  sourceInput: SourceInput;
  sourcesData: SearchLocationsQuery;
  setActiveTab: (tab: string | null) => void;
  updateVerifierData: (newData: Partial<VerifierInput>) => void;
  updateSourceInput: (newData: Partial<SourceInput>) => void;
  updateSourceData: (newData: Partial<SearchLocationsQuery>) => void;
  clearStore: () => void;
}

export const useTabStore = create<TabStore>()(
  persist(
    (set) => ({
      activeTab: "verifier",
      verifierData: { postcode: "", state: "", suburb: "" },
      sourceInput: { query: "" },
      sourcesData: {
        searchLocations: {
          __typename: undefined,
          message: undefined,
          data: undefined,
          error: undefined,
        },
      },
      setActiveTab: (tab) => set({ activeTab: tab }),
      updateVerifierData: (newData) =>
        set((state) => ({ verifierData: { ...state.verifierData, ...newData } })),
      updateSourceInput: (newData) =>
        set((state) => ({ sourceInput: { ...state.sourceInput, ...newData } })),
      updateSourceData: (newData) =>
        set((state) => ({ sourcesData: { ...state.sourcesData, ...newData } })),
      clearStore: () =>
        set({
          activeTab: "verifier",
          verifierData: { postcode: "", state: "", suburb: "" },
          sourceInput: { query: "" },
          sourcesData: undefined,
        }),
    }),
    {
      name: "tab-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
