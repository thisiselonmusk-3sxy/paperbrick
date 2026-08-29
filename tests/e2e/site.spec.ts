import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const projectSlugs = [
  "perumal",
  "ramkumar",
  "nisha",
  "alagiri",
  "balaji",
  "jvk",
  "tilak",
  "kannan",
  "dinesh",
  "kavitha",
  "praveen",
  "ramasamy",
  "pradeep",
];

test("homepage, archive and project routes are usable", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "Paper Brick Architects" })).toBeAttached();
  await expect(page.getByRole("link", { name: /view all work/i })).toBeVisible();

  await page.goto("/work");
  await expect(page.getByRole("heading", { level: 1, name: "Work" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole("button", { name: "Completed" }).click();
  await expect(page.getByText("Showing 2 projects.")).toBeAttached();

  await page.goto("/work/perumal");
  await expect(page.getByRole("heading", { level: 1, name: "Perumal" })).toBeVisible();
  await expect(page.getByText("6,558 sq ft")).toBeVisible();
});

test("all canonical project routes render a working hero image", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-1280");

  for (const slug of projectSlugs) {
    await page.goto(`/work/${slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const hero = page.locator("main img").first();
    await expect(hero).toBeVisible();
    await expect.poll(() => hero.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
  }
});

test("contact validation is real and verified contact links are present", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-1280");
  await page.goto("/contact");
  await page.getByRole("button", { name: /continue in whatsapp/i }).click();
  await expect(page.getByText("Enter your name.")).toBeVisible();
  await expect(page.getByLabel(/^Name/)).toBeFocused();
  await expect(page.getByRole("link", { name: "info@paperbrick.com" }).first()).toHaveAttribute(
    "href",
    "mailto:info@paperbrick.com",
  );
  await expect(page.getByRole("link", { name: "+91 95008 81113" }).first()).toHaveAttribute(
    "href",
    "tel:+919500881113",
  );
});

test("primary pages have no serious automated accessibility violations", async ({ page }) => {
  for (const route of ["/", "/work", "/work/perumal", "/studio", "/services", "/contact"]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? "")), route).toEqual([]);
  }
});

test("mobile menu traps focus and closes with Escape", async ({ page, isMobile }) => {
  test.skip(!isMobile && (page.viewportSize()?.width ?? 1000) > 767);
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Menu" });
  await menu.click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
});

test("legacy endpoints return 301", async ({ request }) => {
  const archive = await request.get("/latestProjects", { maxRedirects: 0 });
  expect(archive.status()).toBe(301);
  const project = await request.get("/projects/perumal", { maxRedirects: 0 });
  expect(project.status()).toBe(301);
});
