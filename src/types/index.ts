export interface Track {
  id: string
  number: string
  title: string
  duration: string
  bitrate: string
  frequency: number
}

export interface Release {
  id: string
  catalog: string
  year: string
  format: string
  title: string
  description: string
  artwork: string
  tracks: Track[]
}

export interface NewsItem {
  id: string
  date: string
  category: string
  headline: string
  previewImage: string
  caption: string
  content: string
}

export type TourStatus = 'SOLD OUT' | 'AVAILABLE' | 'ARCHIVED'

export interface TourDate {
  id: string
  date: string
  city: string
  venue: string
  status: TourStatus
}

export interface BandMember {
  id: string
  name: string
  role: string
  equipment: string
  frequency: string
}

export type SectionId = 'news' | 'join' | 'about' | 'contact'

