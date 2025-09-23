import { ensureLeadingAndTrailingSlashes } from "./path";
import type { SidebarEntry, SidebarGroup, SidebarLink } from "./sidebar";

/**
 * Given a group’s entries, determine the "base path" for that group.
 * Usually this is the parent folder of its child links.
 * Example: ["/guides/", "/guides/installation/"] -> "/guides/"
 */
export function getGroupBase(entries: SidebarEntry[]): string | null {
  const links = entries.filter((e): e is SidebarLink => e.type === "link");
  if (links.length === 0) return null;

  // take the first link as a reference
  const first = links[0] ? ensureLeadingAndTrailingSlashes(links[0].href) : "/";

  // cut off everything after the last slash (folder level)
  // "/guides/installation/" -> "/guides/"
  const parts = first.split("/").filter(Boolean);
  if (parts.length === 0) return "/";

  return "/" + parts[0] + "/";
}

/**
 * Try to find the "index.md" page in a group.
 * That is: the child link whose href matches the group base path.
 */
export function findIndexLink(group: SidebarGroup): SidebarLink | null {
  const base = getGroupBase(group.entries);
  if (!base) return null;

  const links = group.entries.filter(
    (e): e is SidebarLink => e.type === "link"
  );
  return (
    links.find((link) => ensureLeadingAndTrailingSlashes(link.href) === base) ??
    null
  );
}

/**
 * Promote an index link to become the group’s own clickable link,
 * and remove it from the children.
 */
export function promoteIndexLink(
  group: SidebarGroup
): SidebarGroup | SidebarClickableGroup {
  const index = findIndexLink(group);
  if (!index) return group;

  const newEntries = group.entries.filter(
    (e) => !(e.type === "link" && e.href === index.href)
  );

  return {
    ...group,
    // Attach href & attrs so the group itself can be rendered as a link
    href: index.href,
    isCurrent: index.isCurrent,
    attrs: index.attrs,
    entries: newEntries,
  } as SidebarClickableGroup;
}

export type SidebarClickableGroup = SidebarGroup & {
  href?: string;
  isCurrent?: boolean;
  attrs: Record<string, any>;
};
export type SidebarClickableEntry =
  | SidebarLink
  | SidebarGroup
  | SidebarClickableGroup;
