import { formAction } from "@/actions/form-action";
import { useTabStore } from "@/store/use-tab-store";
import { SearchLocationResult, SearchLocationsQuery } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";

export const sourceInputSchema = z.object({
  query: z.string().min(1, "Postcode/Suburb is required"),
});

export type SourceInput = z.infer<typeof sourceInputSchema>;

export const useSourceForm = () => {
  const { updateSourceInput, updateSourceData } = useTabStore();
  const [selectedId, setSelectedId] = useState<SearchLocationResult | null>(null);

  const getCurrentState = useTabStore.getState;
  const [results, setResults] = useState<SearchLocationsQuery>();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<SourceInput>({
    defaultValues: { query: getCurrentState().sourceInput.query },
    resolver: zodResolver(sourceInputSchema),
  });

  async function handleSubmit(data: SourceInput) {
    updateSourceInput(data);
    try {
      setIsLoading(true);
      const response = await formAction("source", data);
      updateSourceData(response);
      setResults(response);
      if (!response?.searchLocations?.data?.length) {
        toast.error(response.searchLocations.message);
      } else {
        toast.success(response.searchLocations.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleClick = useCallback((location: SearchLocationResult | null) => {
    setSelectedId(location);
  }, []);

  return {
    form,
    handleSubmit,
    isLoading,
    selectedId,
    results: results ?? getCurrentState().sourcesData,
    handleClick,
  };
};
