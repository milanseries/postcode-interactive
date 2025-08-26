"use server";

import { SourceInput } from "@/components/source/use-source-form";
import { VerifierInput } from "@/components/verifier/use-verifier-form";
import { MUTATION_VERIFY_LOCATION } from "@/lib/graphql/mutation.graphql";
import { QUERY_SEARCH_LOCATIONS } from "@/lib/graphql/query.graphql";
import { graphqlRequest } from "@/services/graphql-service";
import { SearchLocationsQuery, VerifyLocationMutation } from "@/types";

type ActionType = "source" | "verifier";
const actionConfigs = {
  source: { operation: QUERY_SEARCH_LOCATIONS },
  verifier: { operation: MUTATION_VERIFY_LOCATION },
} as const;

export async function formAction<T extends ActionType>(
  type: T,
  formData: T extends "source" ? SourceInput : VerifierInput
): Promise<T extends "source" ? SearchLocationsQuery : VerifyLocationMutation> {
  return graphqlRequest<T extends "source" ? SearchLocationsQuery : VerifyLocationMutation>(
    actionConfigs[type].operation,
    { ...formData }
  );
}
