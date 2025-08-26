import { SearchLocationResult, SearchLocationsQuery } from "@/types";
import { Text, Grid, Card } from "@mantine/core";

export const SourceResult = ({
  results,
  handleClick,
  selectedId,
}: {
  results: SearchLocationsQuery | undefined;
  handleClick: (location: SearchLocationResult | null) => void;
  selectedId: SearchLocationResult | null;
}) => {
  return (
    <Grid gutter="xs">
      {results?.searchLocations?.data?.map((loc) => (
        <Grid.Col key={loc?.id} span={{ base: 12, sm: 6 }}>
          <Card
            radius="md"
            withBorder
            onClick={() => handleClick(loc)}
            style={{
              cursor: "pointer",
              borderColor: selectedId === loc ? "var(--mantine-color-blue-6)" : undefined,
            }}
          >
            <Text size="sm" fw={500}>
              {loc?.location}
            </Text>
            <Text size="xs">
              {loc?.state}, {loc?.postcode}
            </Text>
            <Text size="xs" c="dimmed">
              {loc?.category}
            </Text>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
};
