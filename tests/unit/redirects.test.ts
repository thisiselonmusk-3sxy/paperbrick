import { describe, expect, it } from "vitest";
import { GET as latestProjectsRedirect } from "@/app/latestProjects/route";
import { GET as projectRedirect } from "@/app/projects/[slug]/route";

describe("legacy redirects", () => {
  it("redirects the old archive with an exact 301", () => {
    const response = latestProjectsRedirect(new Request("https://example.com/latestProjects"));
    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe("https://example.com/work");
  });

  it("redirects old project paths with an exact 301", async () => {
    const response = await projectRedirect(new Request("https://example.com/projects/perumal"), { params: Promise.resolve({ slug: "perumal" }) });
    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe("https://example.com/work/perumal");
  });
});
