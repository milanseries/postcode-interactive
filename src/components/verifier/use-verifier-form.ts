import { formAction } from "@/actions/form-action";
import { useTabStore } from "@/store/use-tab-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";

export const verifierSchema = z.object({
  postcode: z.string().min(1, "Postcode is required"),
  suburb: z.string().min(1, "Suburb is required"),
  state: z.string().min(1, "State is required"),
});

export type VerifierInput = z.infer<typeof verifierSchema>;

export const useVerifierForm = () => {
  const { updateVerifierData } = useTabStore();
  const getCurrentState = useTabStore.getState;
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<VerifierInput>({
    resolver: zodResolver(verifierSchema),
    defaultValues: {
      postcode: getCurrentState().verifierData.postcode,
      state: getCurrentState().verifierData.state,
      suburb: getCurrentState().verifierData.suburb,
    },
  });

  async function handleSubmit(data: VerifierInput) {
    updateVerifierData(data);
    try {
      setIsLoading(true);
      const response = await formAction("verifier", data);
      const verifiedMessage = response?.verifyLocation?.message;
      if (verifiedMessage) {
        toast.success(response?.verifyLocation?.message);
      } else {
        toast.error(response?.verifyLocation?.error?.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return {
    form,
    handleSubmit,
    isLoading,
  };
};
