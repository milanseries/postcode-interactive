import gql from "graphql-tag";

export const typeDefs = gql`
  input VerifyLocationInput {
    postcode: String!
    suburb: String!
    state: String!
  }

  type VerifyLocationError {
    message: String
  }

  type VerifiedLocation {
    postcode: String
    suburb: String
    state: String
  }

  type VerifyLocationPayload {
    message: String
    data: VerifiedLocation
    error: VerifyLocationError
  }

  type SearchLocationResult {
    category: String
    id: Int
    latitude: Float
    location: String
    longitude: Float
    postcode: String
    state: String
  }

  type SearchLocationsPayload {
    message: String
    data: [SearchLocationResult]
  }

  input SearchLocationInput {
    query: String!
  }

  type Query {
    searchLocations(input: SearchLocationInput!): SearchLocationsPayload!
  }

  type Mutation {
    verifyLocation(input: VerifyLocationInput!): VerifyLocationPayload!
  }
`;
