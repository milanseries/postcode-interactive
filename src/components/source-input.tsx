"use client";

import z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, Button, Box, Flex, Card, Grid, Typography } from "@mantine/core";
import { useTabStore } from "@/store/use-tab-store";
import { sourceAction } from "@/actions/source-action";
import { useState } from "react";
import { SearchLocationResult, SearchLocationsQuery } from "@/types";
import { MapContainer } from "./map-container";
import { toast } from "react-toastify";

export const sourceInputSchema = z.object({
  query: z.string().min(1, "Query is required"),
});

export const SourceInput = () => {
  const { updateSourceData } = useTabStore();
  const [selectedId, setSelectedId] = useState<SearchLocationResult | null>(null);

  const getCurrentState = useTabStore.getState;
  const [results, setResults] = useState<SearchLocationsQuery>();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof sourceInputSchema>>({
    defaultValues: { query: getCurrentState().sourceData.query },
    resolver: zodResolver(sourceInputSchema),
  });

  async function handleSubmit(data: z.infer<typeof sourceInputSchema>) {
    updateSourceData(data);
    try {
      setIsLoading(true);
      const response = await sourceAction(data);
      setResults(response);
    } catch {
      toast.error("check your api");
    } finally {
      setIsLoading(false);
    }
  }

  const handleClick = (location: SearchLocationResult | null) => {
    setSelectedId(location);
  };

  return (
    <Box>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Flex gap="sm" direction="column">
          <Controller
            name="query"
            control={form.control}
            render={({ field }) => (
              <TextInput
                label="Postcode/Suburb"
                placeholder="Please enter your Postcode/Suburb"
                {...field}
                error={form?.formState?.errors?.query?.message}
              />
            )}
          />
        </Flex>
        <Button mt="8" variant="filled" type="submit" loading={isLoading} fullWidth>
          Search
        </Button>
        <Box mt="md">
          <MapContainer lat={selectedId?.latitude} loc={selectedId?.longitude} />
        </Box>
      </form>
      <Box mt="md">
        <Grid>
          {results?.searchLocations?.data?.map((loc) => (
            <Grid.Col key={loc?.id} span={{ base: 12, sm: 6, lg: 4 }}>
              <Card
                padding="lg"
                radius="md"
                withBorder
                onClick={() => handleClick(loc)}
                style={{
                  cursor: "pointer",
                  borderColor: selectedId === loc ? "var(--mantine-color-blue-6)" : undefined,
                }}
              >
                <Typography fw={500}>{loc?.location}</Typography>
                <Typography c="dimmed">
                  {loc?.state}, {loc?.postcode}
                </Typography>
                <Typography c="dimmed">{loc?.category}</Typography>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
