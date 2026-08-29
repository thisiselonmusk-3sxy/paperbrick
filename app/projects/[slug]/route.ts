export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  return Response.redirect(new URL(`/work/${slug}`, request.url), 301);
}
