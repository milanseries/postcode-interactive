import gql from "graphql-tag";

export const QUERY_SEARCH_LOCATIONS = gql`
  query SearchLocations($input: SearchLocationInput!) {
    searchLocations(input: $input) {
      data {
        category
        id
        latitude
        location
        longitude
        postcode
        state
      }
      message
    }
  }
`;
