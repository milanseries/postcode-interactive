import { searchLocations, verifyLocation } from "@/services/location-service";
import { Resolvers } from "@/types";
import { ApiService } from "@/utils/api-service";
import { extractToken, handleApiError } from "@/utils/api-utils";

export const createResolvers = (dependencies: { apiService: ApiService }): Resolvers => {
  const { apiService } = dependencies;
  return {
    Query: {
      searchLocations: async (_, { input }, contextValue) => {
        try {
          const token = extractToken(contextValue.req.headers.get("authorization"));
          const { localities, message } = await searchLocations(input.query, token, apiService);
          return {
            message,
            data: localities,
          };
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
