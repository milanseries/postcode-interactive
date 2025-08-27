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
    category: { type: "keyword" },
    locationId: { type: "integer" },
    location: {
      type: "text",
      fields: {
        keyword: {
          type: "keyword",
          ignore_above: 256,
        },
      },
    },
    postcode: { type: "keyword" },
    state: { type: "keyword" },
    coordinates: { type: "geo_point" },
  },
};

export const searchLocationsIndexConfig = {
  index: SEARCH_LOCATIONS_INDEX,
  mappings: mapping,
};
