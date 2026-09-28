export interface Track {
  id: string;
  number: string;
  title: string;
  duration: string;
  bitrate: string;
  frequency: number;
}

export interface Release {
  id: string;
  catalog: string;
  year: string;
  format: string;
  title: string;
  description: string;
  artwork: string;
  tracks: Track[];
}

export interface NewsItem {
  id: string;
  headline: string;
  previewImage: string;
  content: string;
}

export type TourStatus = "SOLD OUT" | "AVAILABLE" | "ARCHIVED";

export interface TourDate {
  id: string;
  date: string;
  city: string;
  venue: string;
  status: TourStatus;
}

export interface BandMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  description: string;
  equipment?: string;
  frequency?: string;
  status?: string;
}

export interface JoinCard {
  id: string;
  title: string;
  subtitle: string;
  soundStyle: string;
  requirements: string[];
  buttonText: string;
  emailSubject?: string;
  emailBody?: string;
}

export interface JoinUsContent {
  enabled: boolean;
  title: string;
  subtitle: string;
  contactEmail: string;
  cards: JoinCard[];
}

export interface AboutContent {
  title: string;
  lead: string;
  paragraphs: string[];
  membersTitle: string;
  members: BandMember[];
}

export interface HeroContent {
  title: string;
  scrollCue: string;
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
}

export interface FooterContent {
  wordmark: string;
  recruitmentTitle: string;
  contactEmail: string;
  locationCity: string;
  locationCountry: string;
  copyright: string;
  socialLinks: SocialLink[];
}

export interface SiteContent {
  hero: HeroContent;
  news: NewsItem[];
  joinUs: JoinUsContent;
  about: AboutContent;
  footer: FooterContent;
}

export type SectionId = "news" | "join" | "about" | "contact";
