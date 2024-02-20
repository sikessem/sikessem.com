import qwikServer from "./server/entry.deno.js";

Deno.serve(async (request) => {
  const response = await (qwikServer(request) as Promise<Response>);
  if (response.ok) {
    return response;
  }
  return new Response("Welcome to Sikessem");
});
