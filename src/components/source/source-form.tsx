"use client";

import { Controller } from "react-hook-form";
import { TextInput, Button, Box, Flex, Grid } from "@mantine/core";
import { MapContainer } from "../map/map-container";
import { useSourceForm } from "./use-source-form";
import { SourceResult } from "./source-result";

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
      </form>
      {results?.searchLocations.data?.length ? (
        <Box mt="md">
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6, lg: 6 }}>
              <Box
                style={{
                  height: "400px",
                  overflowY: "auto",
                  paddingRight: "var(--mantine-spacing-xs)",
                }}
              >
                <SourceResult results={results} handleClick={handleClick} selectedId={selectedId} />
              </Box>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, lg: 6 }}>
              <MapContainer lat={selectedId?.latitude} loc={selectedId?.longitude} />
            </Grid.Col>
          </Grid>
        </Box>
      ) : null}
    </Box>
  );
};
