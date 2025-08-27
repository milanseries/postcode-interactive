import { Resolvers } from "@/types";
import { ApiService } from "@/services/api-service";
import { extractToken, handleApiError } from "@/services/graphql-service";
import { searchLocations, verifyLocation } from "@/utils/utils";
import { elasticClient } from "../elasticsearch/elastic-client";
import { SEARCH_LOCATIONS_INDEX } from "../elasticsearch/elastic-index-configs";

export const createResolvers = (dependencies: { apiService: ApiService }): Resolvers => {
  const { apiService } = dependencies;
  return {
    Query: {
      searchLocations: async (_, { input }, contextValue) => {
        try {
          const token = extractToken(contextValue.req.headers.get("authorization"));
          const { localities } = await apiService.getData({ q: input.query }, token);
          const body = localities?.locality?.flatMap((loc) => [
            { index: { _index: SEARCH_LOCATIONS_INDEX } },
            {
              searchQuery: input.query,
              timestamp: new Date().toISOString(),
              category: loc?.category,
              locationId: loc?.id,
              location: loc?.location,
              postcode: loc?.postcode,
              state: loc?.state,
              coordinates: {
                lat: loc?.latitude || 0,
                lon: loc?.longitude || 0,
              },
            },
          ]);
          try {
            await elasticClient.bulk({
              refresh: true,
              body,
            });
          } catch {}
          const { locations, message } = searchLocations(localities.locality, input.query);
          return { message, data: locations };
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
          const { localities } = await apiService.getData({ q: postcode, state }, token);
          const result = await verifyLocation(input, localities?.locality);
          try {
            await elasticClient.index({
              refresh: true,
              index: SEARCH_LOCATIONS_INDEX,
              body: {
                query: input?.suburb,
                timestamp: new Date().toISOString(),
                category: result?.matchingLocation?.category,
                locationId: result?.matchingLocation?.id,
                location: result?.matchingLocation?.location,
                postcode: result?.matchingLocation?.postcode,
                state: result?.matchingLocation?.state,
                coordinates: {
                  lat: result?.matchingLocation?.latitude || 0,
                  lon: result?.matchingLocation?.longitude || 0,
                },
              },
            });
          } catch {}
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
