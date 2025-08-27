/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from "@elastic/elasticsearch";

export const elasticClient = new Client({
  node: process.env.NEXT_ELASTIC_SEARCH_CLIENT_NODE || "",
  auth: {
    apiKey: process.env.NEXT_ELASTIC_API_KEY || "",
  },
});

export async function indexExists(indexName: string): Promise<boolean> {
  try {
    return await elasticClient.indices.exists({ index: indexName });
  } catch (error) {
    console.error(`Error checking if index ${indexName} exists:`, error);
    return false;
  }
}

export async function createIndex(config: any): Promise<void> {
  try {
    const { index, mappings } = config;
    await elasticClient.indices.create({
      index,
      mappings,
    });
  } catch (error) {
    console.error(`Error creating index ${config.index}:`, error);
    throw error;
  }
}

export async function setupElasticsearchIndex(config: any) {
  try {
    const exists = await indexExists(config.index);
    if (!exists) {
      await createIndex(config);
    } else {
      console.log(`Index ${config.index} already exists`);
    }
  } catch (error) {
    console.error(`Error setting up index ${config.index}:`, error);
    throw error;
  }
}
