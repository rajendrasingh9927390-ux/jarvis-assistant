
const ALLOWED_ORIGIN =
  "https://rajendrasingh9927390-ux.github.io";

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin":
        origin === ALLOWED_ORIGIN ? origin : "null",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    const url = new URL(request.url);

    if (url.pathname === "/health" && request.method === "GET") {
      return Response.json({
        status: "backend-ready",
        ai: "not-connected"
      }, { headers });
    }

    if (url.pathname === "/chat" && request.method === "POST") {
      try {
        const body = await request.json();

        if (
          typeof body.message !== "string" ||
          body.message.trim().length === 0 ||
          body.message.length > 2000
        ) {
          return Response.json({
            error: "Invalid message"
          }, { status: 400, headers });
        }

        return Response.json({
          status: "backend-ready",
          reply: "AI connection is not configured yet."
        }, { status: 503, headers });

      } catch {
        return Response.json({
          error: "Invalid request"
        }, { status: 400, headers });
      }
    }

    return Response.json({
      error: "Route not found"
    }, { status: 404, headers });
  }
};
