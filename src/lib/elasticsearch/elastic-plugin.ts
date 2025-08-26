import { ApolloServerPlugin } from "@apollo/server";
import { setupElasticsearchIndex } from "./elastic-client";
import { searchLocationsIndexConfig } from "./elastic-index-configs";

export const elasticsearchPlugin: ApolloServerPlugin = {
  async serverWillStart() {
    await setupElasticsearchIndex(searchLocationsIndexConfig);
  },
};
