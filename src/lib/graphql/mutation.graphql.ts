import gql from "graphql-tag";

export const MUTATION_VERIFY_LOCATION = gql`
  mutation VerifyLocation($input: VerifyLocationInput!) {
    verifyLocation(input: $input) {
      message
      data {
        postcode
        suburb
        state
      }
      error {
        message
      }
    }
  }
`;
