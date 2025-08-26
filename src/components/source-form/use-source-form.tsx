import { dynamicAction } from "@/actions/generic-action";
import { useTabStore } from "@/store/use-tab-store";
import { SearchLocationResult, SearchLocationsQuery } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";

export const sourceInputSchema = z.object({
  query: z.string().min(1, "Query is required"),
});

export type SourceInput = z.infer<typeof sourceInputSchema>;

export const useSourceForm = () => {
  const { updateSourceData } = useTabStore();
  const [selectedId, setSelectedId] = useState<SearchLocationResult | null>(null);

  const getCurrentState = useTabStore.getState;
  const [results, setResults] = useState<SearchLocationsQuery>();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<SourceInput>({
    defaultValues: { query: getCurrentState().sourceData.query },
    resolver: zodResolver(sourceInputSchema),
  });

  async function handleSubmit(data: SourceInput) {
    updateSourceData(data);
    try {
      setIsLoading(true);
      const response = await dynamicAction("source", data);
      setResults(response);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleClick = (location: SearchLocationResult | null) => {
    setSelectedId(location);
  };

  return {
    form,
    handleSubmit,
    isLoading,
    selectedId,
    results,
    handleClick,
  };
};
