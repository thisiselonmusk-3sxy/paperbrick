import type { ImageAsset, Project } from "./types";

const SOURCE_ROOT = "https://www.paperbrickarchitects.com/assets";

function gallery(
  slug: string,
  descriptions: string[],
  dimensions: { width: number; height: number } = { width: 1920, height: 1080 },
  dimensionOverrides: Record<number, { width: number; height: number }> = {},
): ImageAsset[] {
  return descriptions.map((alt, index) => {
    const number = index + 1;
    const size = dimensionOverrides[number] ?? dimensions;
    return {
      src: `/media/projects/${slug}/${slug}-${String(number).padStart(2, "0")}.jpg`,
      sourceUrl: `${SOURCE_ROOT}/${slug}/img${number}.jpg`,
      alt,
      width: size.width,
      height: size.height,
    };
  });
}

const alagiriImages = gallery(
  "alagiri",
  [
    "Dusk front elevation of the Alagiri residence in Thoothukudi with a deep upper-floor frame and warm lighting.",
    "Wide exterior view of the Alagiri residence showing the framed facade and planted boundary.",
  ],
  { width: 3240, height: 2160 },
  { 2: { width: 6480, height: 4320 } },
);

const balajiImages = gallery("balaji", [
  "Balaji residence bedroom with a timber canopy bed, green shutters and white walls.",
  "Wide bedroom view in the Balaji residence showing the canopy bed and window seating.",
  "Balaji residence seating corner with timber chairs, a small table and filtered daylight.",
  "Timber-lined media wall in the Balaji residence living room.",
  "Balaji residence living room with timber furniture and a full-height slatted media wall.",
  "Balaji residence bedroom entrance framed by a fine timber-and-metal screen.",
  "Raised bed platform in the Balaji residence with a pale stone feature wall.",
  "Balaji residence wash area arranged behind a geometric metal screen.",
  "Open stair and display storage in the Balaji residence interior.",
  "Bright stair hall in the Balaji residence with floating dark treads and timber details.",
], { width: 1920, height: 1080 }, {
  1: { width: 3840, height: 2160 },
  2: { width: 3840, height: 2160 },
});

const dineshImages = gallery("dinesh", [
  "Front approach to the Dinesh residence with layered white volumes and a sheltered entrance.",
  "Closer view of the Dinesh residence entrance canopy and landscaped edge.",
  "Garden-side elevation of the Dinesh residence in warm evening light.",
  "Circular entry platform and planted facade at the Dinesh residence.",
  "Long walled driveway beside the Dinesh residence at dusk.",
  "Rear garden elevation of the Dinesh residence with a deep horizontal canopy.",
]);

const jvkImages = gallery("jvk", [
  "Corner view of the JVK residence in Tiruchendur with white volumes and dark projecting frames.",
  "Straight-on street elevation of the JVK residence and its low boundary wall.",
  "Oblique front elevation of the JVK residence showing the upper terrace frame.",
  "Wide corner elevation of the JVK residence with its entrance and planted boundary.",
], { width: 3840, height: 2160 });

const kannanImages = gallery("kannan", [
  "Corner street view of the Kannan residence in Thoothukudi with white walls and timber soffits.",
  "Front elevation of the Kannan residence showing the recessed upper terrace.",
  "Angled exterior view of the Kannan residence framed by palms and boundary planting.",
], { width: 3840, height: 2160 }, { 1: { width: 1920, height: 1080 } });

const kavithaImages = gallery("kavitha", [
  "Street elevation of the Kavitha residence in Thoothukudi with a compact white-and-stone facade.",
  "Closer front view of the Kavitha residence and its sheltered entrance.",
  "Angled exterior view of the Kavitha residence with palm planting and a low compound wall.",
  "Evening view of the Kavitha residence with facade lighting switched on.",
  "Side approach to the Kavitha residence showing the upper balcony and boundary wall.",
], { width: 3840, height: 2160 }, { 5: { width: 1920, height: 1080 } });

const nishaImages = gallery("nisha", [
  "Daylight street elevation of the Nisha residence in Thoothukudi with layered white frames and timber screens.",
  "Dusk elevation of the Nisha residence with the entrance and balcony lighting illuminated.",
], { width: 3840, height: 2160 });

const perumalImages = gallery("perumal", [
  "Front elevation of the Perumal residence in Thoothukudi with white volumes and vertical timber screens.",
  "Angled exterior view of the Perumal residence showing the projecting upper-floor frame.",
  "Perumal residence bedroom with pale finishes, integrated window seating and linear lighting.",
  "Second bedroom view in the Perumal residence with a low platform bed and corner window.",
  "Perumal residence bedroom viewed toward the timber storage wall.",
  "Open living area in the Perumal residence with a stair, display shelving and monochrome floor pattern.",
  "Perumal residence stair and display joinery seen across a bright double-height space.",
  "Floating dark staircase in the Perumal residence beside pale walls and indoor planting.",
  "Bedroom in the Perumal residence with a gridded rug, timber door and integrated storage.",
  "Wide bedroom view in the Perumal residence showing windows, seating and built-in joinery.",
  "Perumal residence stair landing with a mirror, timber door and filtered daylight.",
  "Quiet interior corner in the Perumal residence with a timber door, mirror and low display shelf.",
  "Window seat and study ledge in the Perumal residence overlooking surrounding greenery.",
], { width: 1920, height: 1080 }, {
  1: { width: 3840, height: 2160 },
  2: { width: 3840, height: 2160 },
});

const pradeepImages = gallery("pradeep", [
  "Light-filled dressing corner in the Pradeep residence with an arched mirror and pale timber cabinetry.",
  "Pradeep residence bedroom interior with full-height curtains and integrated display storage.",
  "Detail view of the Pradeep residence dressing area and illuminated shelving.",
]);

const praveenImages = gallery("praveen", [
  "Street elevation of the Praveen residence in Trichy with a compact white-and-gray composition.",
  "Angled front elevation of the Praveen residence framed by palms and a low compound wall.",
]);

const ramasamyImages = gallery("ramasamy", [
  "Ramasamy residence living room with a circular ceiling recess, pale seating and burgundy wall panels.",
  "Wide living-room view in the Ramasamy residence showing the staircase and media wall.",
  "Ramasamy residence seating area with a dark stair and softly lit ceiling feature.",
  "Media wall and storage in the Ramasamy residence against burgundy paneling.",
]);

const ramkumarImages = gallery("ramkumar", [
  "Daylight front elevation of the Ramkumar residence in Thoothukudi with a deep white frame and timber cladding.",
  "Angled daylight elevation of the Ramkumar residence and perforated metal gates.",
  "Dusk elevation of the Ramkumar residence with facade lighting switched on.",
  "Straight-on evening view of the Ramkumar residence behind a dark boundary wall.",
  "Ramkumar residence living and dining space divided by dark timber fins and a stone column.",
  "Ramkumar residence living room with white sofas, round wall art and layered curtains.",
  "Textured media wall and illuminated display cabinet in the Ramkumar residence.",
  "Ramkumar residence living and dining room with blue seating and a suspended planter screen.",
  "Dining area in the Ramkumar residence framed by a vertical indoor planter installation.",
  "Timber media wall in the Ramkumar residence living room with peach lounge chairs.",
  "Ramkumar residence lounge with a blue sectional sofa and a gallery wall of monochrome artwork.",
  "Wide living and dining view in the Ramkumar residence with daylight from a bank of windows.",
]);

const tilakImages = gallery("tilak", [
  "Reception lounge of the Tilak hospital in Tirunelveli with pale finishes and green seating.",
  "Tilak hospital reception desk with integrated signage and waiting area.",
  "Angled view across the Tilak hospital reception and consultation counter.",
  "Main waiting area and timber reception desk at the Tilak hospital.",
  "Timber screen and circulation route beside the Tilak hospital waiting area.",
  "Quiet corridor and seating niche in the Tilak hospital interior.",
  "Wide view of the Tilak hospital reception with timber fins and linear lighting.",
], { width: 3840, height: 2160 });

export const projects: Project[] = [
  { slug: "perumal", name: "Perumal", location: "Thoothukudi", siteAreaSqFt: 6558, builtUpAreaSqFt: 2652, category: "Residential", scope: "Architectural & Interior Consultant", status: "Ongoing", coverImage: perumalImages[0], gallery: perumalImages, featured: true, order: 1 },
  { slug: "ramkumar", name: "Ramkumar", location: "Thoothukudi", siteAreaSqFt: 2730, builtUpAreaSqFt: 1967, category: "Residential", scope: "Architectural & Interior Consultant", status: "Ongoing", coverImage: ramkumarImages[0], gallery: ramkumarImages, featured: true, order: 2 },
  { slug: "nisha", name: "Nisha", location: "Thoothukudi", siteAreaSqFt: 2310, builtUpAreaSqFt: 2135, category: "Residential", scope: "Architectural & Interior Consultant", status: "Ongoing", coverImage: nishaImages[0], gallery: nishaImages, featured: true, order: 3 },
  { slug: "alagiri", name: "Alagiri", location: "Thoothukudi", siteAreaSqFt: 2178, builtUpAreaSqFt: 1626, category: "Residential", scope: "Architectural Consultant", status: "Completed", coverImage: alagiriImages[0], gallery: alagiriImages, featured: true, order: 4 },
  { slug: "balaji", name: "Balaji", location: "Thiruchendur", siteAreaSqFt: 6666, builtUpAreaSqFt: 3438, category: "Residential", scope: "Architectural & Interior Consultant", status: "Ongoing", coverImage: balajiImages[0], gallery: balajiImages, featured: true, order: 5 },
  { slug: "jvk", name: "JVK", location: "Tiruchendur", siteAreaSqFt: 4632, builtUpAreaSqFt: 1843, category: "Residential", scope: "Architectural Consultant", status: "Ongoing", coverImage: jvkImages[0], gallery: jvkImages, featured: false, order: 6 },
  { slug: "tilak", name: "Tilak", location: "Tirunelveli", siteAreaSqFt: 10432, builtUpAreaSqFt: 5420, category: "Hospital", scope: "Architectural & Interior Consultant", status: "Ongoing", coverImage: tilakImages[0], gallery: tilakImages, featured: true, order: 7 },
  { slug: "kannan", name: "Kannan", location: "Thoothukudi", siteAreaSqFt: 2227, builtUpAreaSqFt: 1180, category: "Residential", scope: "Architectural Consultant", status: "Completed", coverImage: kannanImages[0], gallery: kannanImages, featured: false, order: 8 },
  { slug: "dinesh", name: "Dinesh", location: "Thoothukudi", siteAreaSqFt: 6666, builtUpAreaSqFt: 3438, category: "Residential", scope: "Architectural & Interior Consultant", status: "Ongoing", coverImage: dineshImages[0], gallery: dineshImages, featured: false, order: 9 },
  { slug: "kavitha", name: "Kavitha", location: "Thoothukudi", siteAreaSqFt: null, builtUpAreaSqFt: 2185, category: "Residential", scope: "Architectural & Interior Consultant", status: "Ongoing", coverImage: kavithaImages[0], gallery: kavithaImages, featured: false, order: 10 },
  { slug: "praveen", name: "Praveen", location: "Trichy", siteAreaSqFt: null, builtUpAreaSqFt: 1094, category: "Residential", scope: "Architectural & Interior Consultant", status: "Ongoing", coverImage: praveenImages[0], gallery: praveenImages, featured: false, order: 11 },
  { slug: "ramasamy", name: "Ramasamy", location: "Thoothukudi", siteAreaSqFt: null, builtUpAreaSqFt: 2185, category: "Residential", scope: "Architectural & Interior Consultant", status: "Ongoing", coverImage: ramasamyImages[0], gallery: ramasamyImages, featured: false, order: 12 },
  { slug: "pradeep", name: "Pradeep", location: "Thoothukudi", siteAreaSqFt: null, builtUpAreaSqFt: 2185, category: "Residential", scope: "Architectural & Interior Consultant", status: "Ongoing", coverImage: pradeepImages[0], gallery: pradeepImages, featured: false, order: 13 },
];

export const projectsBySlug = new Map(projects.map((project) => [project.slug, project]));

export function getNextProject(project: Project) {
  return projects[(projects.indexOf(project) + 1) % projects.length];
}

export function displayScope(scope: Project["scope"]) {
  return scope === "Architectural Consultant"
    ? "Architecture"
    : "Architecture + Interiors";
}
