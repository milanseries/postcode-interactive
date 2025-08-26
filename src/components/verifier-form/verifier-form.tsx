"use client";

import { Controller } from "react-hook-form";
import { TextInput, Button, Box, Select, Flex } from "@mantine/core";
import { useVerifierForm } from "./use-verifier-form";

export const VerifierForm = () => {
  const { form, handleSubmit, isLoading } = useVerifierForm();

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
