import gql from "graphql-tag";

export const typeDefs = gql`
  input VerifyLocationInput {
    postcode: String!
    suburb: String!
    state: String!
  }

  type LocationError {
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
    error: LocationError
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
    error: LocationError
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
