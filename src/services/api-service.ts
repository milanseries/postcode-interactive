import { SearchLocationResult } from "@/types";

export class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_API_ENDPOINT || "";
    if (!this.baseURL) {
      throw new Error("API endpoint is not configured");
    }
  }

  private buildUrl(queryParams: Record<string, string>): string {
    const url = new URL(this.baseURL);
    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
    return url.toString();
  }

  async getData(
    queryParams: Record<string, string>,
    token: string
  ): Promise<{
    localities: { locality: SearchLocationResult[] };
  }> {
    if (!token) {
      throw new Error("Authentication token is required");
    }
    const url = this.buildUrl(queryParams);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    if (!data || typeof data !== "object") {
      throw new Error("Invalid API response format");
    }
    return data;
  }
}
