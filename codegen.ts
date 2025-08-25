import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/lib/graphql/typeDefs.ts",
  documents: ["./src/lib/graphql/**/*.graphql.ts"],
  ignoreNoDocuments: true,
  generates: {
    "./src/types.ts": {
      plugins: ["typescript", "typescript-resolvers", "typescript-operations"],
    },
  },
};

export default config;
