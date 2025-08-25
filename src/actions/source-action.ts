"use server";

import { sourceInputSchema } from "@/components/source-input";
import { QUERY_SEARCH_LOCATIONS } from "@/lib/graphql/query.graphql";
import { SearchLocationsQuery } from "@/types";
import { request } from "graphql-request";
import z from "zod";

export const sourceAction = async (formData: z.infer<typeof sourceInputSchema>) => {
  const { query } = formData;
  const response: SearchLocationsQuery = await request(
    "http://localhost:3000/api/graphql",
    QUERY_SEARCH_LOCATIONS,
    { input: { query } },
    {
      Authorization: `Bearer ${process.env.NEXT_GRAPHQL_API_KEY}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  );

  return response;
};
