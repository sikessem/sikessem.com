import serveFontend from "./design/server/entry.deno.js";

Deno.serve(async (request: Request) => {
  const response = await (serveFontend(request) as Promise<Response>);
  if (response.ok) {
    return response;
  }
  return new Response("Welcome to Sikessem");
});
