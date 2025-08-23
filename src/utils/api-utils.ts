import { SearchLocationResult } from "@/types";
import { GraphQLError } from "graphql";

export const extractToken = (authHeader: string | null | undefined): string => {
  if (!authHeader) {
    throw new GraphQLError("Authorization header is required", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }
  return authHeader.replace("Bearer ", "");
};

export const normalizeLocalities = (
  localities: SearchLocationResult | SearchLocationResult[]
): SearchLocationResult[] => {
  if (!localities) return [];
  return Array.isArray(localities) ? localities : [localities];
};

export const handleApiError = (
  error: unknown
): {
  message: string | null;
  data: null;
  error: { message: string; code: string } | null;
} => {
  let errorMessage: string;
  let errorCode: string;

  if (error instanceof GraphQLError) {
    errorMessage = error.message;
    errorCode = (error.extensions?.code as string) || "INTERNAL_SERVER_ERROR";
  } else {
    errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    errorCode = "INTERNAL_SERVER_ERROR";
  }

  return {
    message: null,
    data: null,
    error: {
      message: errorMessage,
      code: errorCode,
    },
  };
};
