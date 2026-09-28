import type { Release, NewsItem, TourDate, BandMember, SiteContent } from "../types";
import rawSiteContent from "./siteContent.json";

export const SITE_CONTENT: SiteContent = rawSiteContent as SiteContent;

/**
 * Resolves a media path (e.g., "/uploads/photo.jpg" or "https://...") to an absolute URL
 * considering Vite's base path (e.g. "/paracorpse/").
 */
export function resolveMediaUrl(path: string | undefined): string {
  if (!path) return "";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:") ||
    path.startsWith("blob:")
  ) {
    return path;
  }

  const base = import.meta.env.BASE_URL || "/";
  const cleanBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}

export const NEWS_DATA: NewsItem[] = SITE_CONTENT.news;
export const BAND_MEMBERS: BandMember[] = SITE_CONTENT.about.members;
export const RELEASES: Release[] = [];
export const TOUR_DATES: TourDate[] = [];
