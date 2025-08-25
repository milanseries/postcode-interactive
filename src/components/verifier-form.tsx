"use client";

import z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, Button, Box, Select, Flex } from "@mantine/core";
import { verifierAction } from "@/actions/verifier-action";
import { useState } from "react";
import { toast } from "react-toastify";
import { useTabStore } from "@/store/use-tab-store";

export const schema = z.object({
  postcode: z.string().min(1, "Postcode is required"),
  suburb: z.string().min(1, "Suburb is required"),
  state: z.string().min(1, "State is required"),
});

export const VerifierForm = () => {
  const { updateVerifierData } = useTabStore();
  const getCurrentState = useTabStore.getState;
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      postcode: getCurrentState().verifierData.postcode,
      state: getCurrentState().verifierData.state,
      suburb: getCurrentState().verifierData.suburb,
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(data: z.infer<typeof schema>) {
    setIsLoading(true);
    updateVerifierData(data);
    const response = await verifierAction(data);
    const verifiedMessage = response?.verifyLocation?.message;
    if (verifiedMessage) {
      toast.success(response?.verifyLocation?.message);
    } else {
      toast.error(response?.verifyLocation?.error?.message);
    }
    setIsLoading(false);
  }

  return (
    <Box>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Flex gap="sm" direction="column">
          <Controller
            name="postcode"
            control={form.control}
            render={({ field }) => (
              <TextInput
                label="Postcode"
                placeholder="Please enter your postcode"
                {...field}
                error={form?.formState?.errors?.postcode?.message}
              />
            )}
          />
          <Controller
            name="suburb"
            control={form.control}
            render={({ field }) => (
              <TextInput
                label="Suburb"
                placeholder="Please enter your suburb"
                {...field}
                error={form?.formState?.errors?.suburb?.message}
              />
            )}
          />
          <Controller
            name="state"
            control={form.control}
            render={({ field }) => (
              <Select
                label="State"
                placeholder="Please select your state"
                data={["VIC", "NSW", "QLD", "WA", "SA", "TAS", "ACT", "NT"]}
                {...field}
                error={form?.formState?.errors?.state?.message}
              />
            )}
          />
        </Flex>
        <Button mt="8" variant="filled" type="submit" loading={isLoading} fullWidth>
          Verify
        </Button>
      </form>
    </Box>
  );
};
