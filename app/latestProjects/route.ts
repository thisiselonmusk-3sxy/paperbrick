export function GET(request: Request) {
  return Response.redirect(new URL("/work", request.url), 301);
}
