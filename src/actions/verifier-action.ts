"use server";

import { schema } from "@/components/verifier-form";
import { MUTATION_VERIFY_LOCATION } from "@/lib/graphql/mutation.graphql";
import { VerifyLocationMutation } from "@/types";
import { request } from "graphql-request";
import z from "zod";

export const verifierAction = async (formData: z.infer<typeof schema>) => {
  const { postcode, suburb, state } = formData;
  const response: VerifyLocationMutation = await request(
    "http://localhost:3000/api/graphql",
    MUTATION_VERIFY_LOCATION,
    {
      input: { postcode, suburb, state },
    },
    {
      Authorization: `Bearer ${process.env.NEXT_GRAPHQL_API_KEY}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  );

  return response;
};
