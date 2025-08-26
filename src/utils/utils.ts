import { SearchLocationResult, VerifyLocationInput } from "@/types";

export const normalizeLocalities = (
  localities: SearchLocationResult | SearchLocationResult[]
): SearchLocationResult[] => {
  if (!localities) return [];
  return Array.isArray(localities) ? localities : [localities];
};

export const searchLocations = (
  results: SearchLocationResult | SearchLocationResult[],
  query: string
) => {
  const locations = normalizeLocalities(results);
  return {
    locations,
    message: locations.length
      ? `Found ${locations.length} suburbs for ${query}`
      : `No suburbs found for ${query}`,
  };
};

export const verifyLocation = async (
  input: VerifyLocationInput,
  results: SearchLocationResult[]
) => {
  const { postcode, suburb, state } = input;
  const localities = normalizeLocalities(results);

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
