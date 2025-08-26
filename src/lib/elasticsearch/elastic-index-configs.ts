export const SEARCH_LOCATIONS_INDEX = "milan-shrees";
export const mapping = {
  properties: {
    query: {
      type: "text",
      fields: {
        keyword: {
          type: "keyword",
          ignore_above: 256,
        },
      },
    },
    timestamp: { type: "date" },
    metadata: {
      type: "object",
      properties: {
        resultCount: { type: "integer" },
        searchType: { type: "keyword" },
        apiVersion: { type: "keyword" },
      },
    },
    id: { type: "keyword" },
    name: {
      type: "text",
      fields: {
        keyword: { type: "keyword" },
      },
    },
    type: { type: "keyword" },
    coordinates: { type: "geo_point" },
    score: { type: "float" },
    address: { type: "text" },
    city: { type: "keyword" },
    country: { type: "keyword" },
  },
};

export const searchLocationsIndexConfig = {
  index: SEARCH_LOCATIONS_INDEX,
  mappings: mapping,
};
