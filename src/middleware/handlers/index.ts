import type { NextApiRequest, NextApiResponse } from "next";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type HttpHandler = (request: NextApiRequest, response: NextApiResponse) => void;

interface RouteHandlerParams {
  GET?: HttpHandler;
  POST?: HttpHandler;
  PUT?: HttpHandler;
  DELETE?: HttpHandler;
}
export const RouteHandler = async (
  request: NextApiRequest,
  response: NextApiResponse,
  handlers: RouteHandlerParams
) => {
  const method = request.method as HttpMethod;
  const handler = handlers[method];

  if (!handler) {
    return response.status(405).send("Method is not allowed");
  }
  return handler(request, response);
};
