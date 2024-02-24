// @ts-ignore
import { serve } from "https://deno.land/std/http/server.ts";
/*
 * WHAT IS THIS FILE?
 *
 * It's the entry point for the Deno HTTP server when building for production.
 *
 * Learn more about the Deno integration here:
 * - https://qwik.builder.io/docs/deployments/deno/
 * - https://deno.com/manual/examples/http_server
 *
 */
import { createQwikCity } from "@builder.io/qwik-city/middleware/deno";
import qwikCityPlan from "@qwik-city-plan";
import { manifest } from "@qwik-client-manifest";
import render from "./entry.ssr";

// Create the Qwik City Deno middleware
const { router, notFound, staticFile } = createQwikCity({
  render,
  qwikCityPlan,
  manifest,
});

// Allow for dynamic port
const port = Number(Deno.env.get("PORT") ?? 8000);

/* eslint-disable */
console.log(
  `Server starter: ${Deno.env.get("APP_URL") || "http://localhost"}:${port}/`,
);

const handler = async (request: Request, conn: any) => {
  const staticResponse = await staticFile(request);
  if (staticResponse) {
    return staticResponse;
  }

  // Server-side render this request with Qwik City
  const qwikCityResponse = await router(request, conn);
  if (qwikCityResponse) {
    return qwikCityResponse;
  }

  // Path not found
  return notFound(request);
};

if (import.meta.main) {
  serve(handler, { port });
}

export default handler;

declare const Deno: any;
