import { DocumentNode, GraphQLError } from "graphql";
import { request } from "graphql-request";

export async function graphqlRequest<T>(operation: DocumentNode, input: object): Promise<T> {
  return request(
    `${process.env.NEXT_GRAPHQL_URL}`,
    operation,
    { input },
    {
      Authorization: `Bearer ${process.env.NEXT_GRAPHQL_API_KEY}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  );
}

export const extractToken = (authHeader: string | null | undefined): string => {
  if (!authHeader) {
    throw new GraphQLError("Authorization header is required", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }
  return authHeader.replace("Bearer ", "");
};

export const handleApiError = (error: unknown): never => {
  let errorMessage: string;
  let errorCode: string;

  if (error instanceof GraphQLError) {
    throw error;
  } else {
    errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    errorCode = "INTERNAL_SERVER_ERROR";

    throw new GraphQLError(errorMessage, {
      extensions: {
        code: errorCode,
      },
    });
  }
};
