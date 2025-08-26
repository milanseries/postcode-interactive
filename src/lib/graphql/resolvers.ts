import { Resolvers } from "@/types";
import { ApiService } from "@/services/api-service";
import { extractToken, handleApiError } from "@/services/graphql-service";
import { searchLocations, verifyLocation } from "@/utils/utils";

export const createResolvers = (dependencies: { apiService: ApiService }): Resolvers => {
  const { apiService } = dependencies;
  return {
    Query: {
      searchLocations: async (_, { input }, contextValue) => {
        try {
          const token = extractToken(contextValue.req.headers.get("authorization"));
          const { localities } = await apiService.getData({ q: input.query }, token);
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
