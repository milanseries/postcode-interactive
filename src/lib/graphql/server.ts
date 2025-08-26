import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "./typeDefs";
import { createResolvers } from "./resolvers";
import { ApiService } from "@/services/api-service";
import { NextRequest } from "next/server";
import { elasticsearchPlugin } from "../elasticsearch/elastic-plugin";

const apiService = new ApiService();
const resolvers = createResolvers({ apiService });
const apolloServer = new ApolloServer<object>({
  typeDefs,
  resolvers,
  plugins: [elasticsearchPlugin],
});

export const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer, {
  context: async (req) => ({ req }),
});
