import { Client } from "@elastic/elasticsearch";

export const elasticClient = new Client({
  node: process.env.NEXT_ELASTIC_SEARCH_CLIENT_NODE || "",
});
