/*
 * WHAT IS THIS FILE?
 *
 * It's the entry point for the Bun HTTP server when building for production.
 *
 * Learn more about the Bun integration here:
 * - https://qwik.builder.io/docs/deployments/bun/
 * - https://bun.sh/docs/api/http
 *
 */
import { createQwikCity } from "@builder.io/qwik-city/middleware/bun";
import qwikCityPlan from "@qwik-city-plan";
import { manifest } from "@qwik-client-manifest";
import render from "./entry.ssr";

// Create the Qwik City Bun middleware
const { router, notFound, staticFile } = createQwikCity({
  render,
  qwikCityPlan,
  manifest,
});

// Allow for dynamic port
const hostname = Bun.env.HOSTNAME ?? "0.0.0.0";
const port = Number(Bun.env.PORT ?? 3000);
const fetch = async (request: Request): Promise<Response> => {
  const staticResponse = await staticFile(request);
  if (staticResponse) {
    return staticResponse;
  }

  // Server-side render this request with Qwik City
  const qwikCityResponse = await router(request);
  if (qwikCityResponse) {
    return qwikCityResponse;
  }

  // Path not found
  return notFound(request);
};

if (import.meta.main) {
  const server = Bun.serve({
    hostname,
    port,
    fetch,
  });

  console.log(
    `Server starter: http://${
      server.hostname === "0.0.0.0" ? "localhost" : server.hostname
    }:${server.port}/`,
  );
}

export default fetch;
