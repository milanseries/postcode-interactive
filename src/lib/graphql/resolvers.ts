import { searchLocations, verifyLocation } from "@/services/location-service";
import { Resolvers } from "@/types";
import { ApiService } from "@/utils/api-service";
import { extractToken, handleApiError } from "@/utils/api-utils";
import { elasticClient } from "@/utils/elastic-client";

const SEARCH_LOCATIONS_INDEX = "search-locations-results";
export const createResolvers = (dependencies: { apiService: ApiService }): Resolvers => {
  const { apiService } = dependencies;
  return {
    Query: {
      searchLocations: async (_, { input }, contextValue) => {
        try {
          const token = extractToken(contextValue.req.headers.get("authorization"));
          const { localities, message } = await searchLocations(input.query, token, apiService);
          const body = localities.flatMap((loc) => [
            { index: { _index: SEARCH_LOCATIONS_INDEX } },
            {
              query: input.query,
              timestamp: new Date().toISOString(),
              metadata: {
                resultCount: localities.length,
                searchType: input.query,
                sessionId: token.slice(-10),
              },
              id: Math.random().toString(36).substring(2, 15),
              name: loc.location,
              type: loc.category,
              coordinates: { lat: loc.latitude || 0, lon: loc.longitude || 0 },
              score: 1.0,
            },
          ]);
          try {
            const indexExists = await elasticClient.indices.exists({
              index: SEARCH_LOCATIONS_INDEX,
            });
            if (!indexExists) {
              await elasticClient.indices.create({
                index: SEARCH_LOCATIONS_INDEX,
                mappings: {
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
                },
              });
            }
            await elasticClient.bulk({ refresh: true, body: body });
          } catch {
            console.log("Error indexing to Elasticsearch");
          }

          return { message, data: localities };
        } catch (error) {
          return handleApiError(error);
        }
      },
    },

    Mutation: {
      verifyLocation: async (_, { input }, contextValue) => {
        try {
          const token = extractToken(contextValue.req.headers.get("authorization"));
          const { postcode, suburb, state } = input;
          const result = await verifyLocation(postcode, suburb, state, token, apiService);
          return {
            message: result.isValid ? "The postcode, suburb, and state input are valid." : null,
            data: result.data || { postcode, suburb, state },
            error: result.error ? { message: result.error } : null,
          };
        } catch (error) {
          return handleApiError(error);
        }
      },
    },
  };
};
