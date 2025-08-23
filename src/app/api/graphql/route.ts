import { handler } from "@/lib/graphql/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
