import { ApiService } from "@/services/api-service";
import { normalizeLocalities } from "@/utils/api-utils";

export const searchLocations = async (query: string, token: string, apiService: ApiService) => {
  const results = await apiService.getData({ q: query }, token);
  const localities = normalizeLocalities(results?.localities?.locality);

  return {
    localities,
    message: localities.length
      ? `Found ${localities.length} suburbs for ${query}`
      : `No suburbs found for ${query}`,
  };
};

export const verifyLocation = async (
  postcode: string,
  suburb: string,
  state: string,
  token: string,
  apiService: ApiService
) => {
  const results = await apiService.getData({ q: postcode, state }, token);
  const localities = normalizeLocalities(results?.localities?.locality);

  const matchingLocation = localities.find(
    (item) => item?.location?.toLowerCase() === suburb.toLowerCase()
  );

  if (!matchingLocation) {
    return {
      isValid: false,
      error: `The postcode ${postcode} does not match the suburb ${suburb}`,
      data: null,
    };
  }

  if (matchingLocation.state?.toLowerCase() !== state.toLowerCase()) {
    return {
      isValid: false,
      error: `The suburb ${suburb} does not exist in the state ${state.toUpperCase()}`,
      data: null,
    };
  }

  return {
    isValid: true,
    error: null,
    data: {
      postcode: matchingLocation.postcode,
      suburb: matchingLocation.location,
      state: matchingLocation.state,
    },
  };
};
