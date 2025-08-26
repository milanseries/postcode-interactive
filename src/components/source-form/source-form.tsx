"use client";

import { Controller } from "react-hook-form";
import { TextInput, Button, Box, Flex, Card, Grid, Typography } from "@mantine/core";
import { MapContainer } from "../map/map-container";
import { useSourceForm } from "./use-source-form";

export const SourceForm = () => {
  const { form, handleSubmit, isLoading, selectedId, results, handleClick } = useSourceForm();

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
