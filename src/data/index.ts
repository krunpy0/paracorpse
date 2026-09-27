import type { Release, NewsItem, TourDate, BandMember } from "../types";
import igorImg from "../assets/Igor.jpg";
import pavelImg from "../assets/Pavel.jpg";
import newsPhoto from "../assets/photo_2026-09-21_00-06-13.jpg";

export const NEWS_DATA: NewsItem[] = [
  {
    id: "n1",
    headline: "NEW CHAPTER BEGINS",
    previewImage: newsPhoto,
    content:
      "After being kicked out of our previous band, Igor and Pasha decided it was time to start something of their own. And so, Paracorpse was born. A new band. A new sound. No compromises. Thank you to everyone who has supported us from the very beginning. This is only the start.",
  },
];

export const RELEASES: Release[] = [];
export const TOUR_DATES: TourDate[] = [];

export const BAND_MEMBERS: BandMember[] = [
  {
    id: "m1",
    name: "Igor Zaytsev",
    role: "Drums",
    photo: igorImg,
    description:
      "Igor is the drummer and one of the songwriters of Paracorpse, bringing a dynamic and energetic approach to the band's modern metal sound. His playing combines precision, groove, and expressive live performance, providing a solid rhythmic foundation for the band's heavier and atmospheric material. Beyond his role as a drummer, Igor contributes to the band's songwriting and helps develop its distinctive sound and musical identity.",
  },
  {
    id: "m2",
    name: "Pavel Enenko",
    role: "Keys",
    photo: pavelImg,
    description:
      "Pavel brings a strong classical piano background to Paracorpse, combining years of academic training and competitive performance experience with the band's modern metal sound. A laureate of regional, interregional, and international piano competitions, he has performed works by composers including Bach, Beethoven, and Grieg. His classical background has shaped his musicality, precision, and approach to performance. Within Paracorpse, Pavel contributes his keyboard expertise while helping shape the band's atmospheric and melodic elements.",
  },
];
