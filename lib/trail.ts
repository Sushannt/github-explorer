export interface TrailCrumb {
  label: string;
  href: string;
}

// Encodes a single crumb as "label|href" and joins multiple with comma
export function encodeTrail(crumbs: TrailCrumb[]): string {
  return crumbs.map((c) => `${encodeURIComponent(c.label)}|${encodeURIComponent(c.href)}`).join(",");
}

export function decodeTrail(trail: string | undefined): TrailCrumb[] {
  if (!trail) return [];
  return trail.split(",").flatMap((segment) => {
    const [label, href] = segment.split("|").map(decodeURIComponent);
    return label && href ? [{ label, href }] : [];
  });
}

// Appends a new crumb to an existing trail string
export function appendTrail(existing: string | undefined, crumb: TrailCrumb): string {
  const current = existing ? decodeTrail(existing) : [];
  return encodeTrail([...current, crumb]);
}
