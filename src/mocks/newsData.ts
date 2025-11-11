export type NewsType = "News" | "Announcement"
export type PublishStatus = "Publish" | "Draft"
export type ActiveStatus = "Active" | "Inactive"
import newsImg1 from '../assets/images/newsImg1.jpg';
import newsImg2 from '../assets/images/newsImg2.jpg';
import newsImg3 from '../assets/images/newsImg3.jpg';
import newsImg4 from '../assets/images/newsImg4.jpg';
import newsImg5 from '../assets/images/newsImg5.jpg';

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  image?: string;
  type: "News" | "Announcement";
  sharingTime: string;
  status: "Active" | "Inactive";
  publishStatus: string;
  author: string;
  url?: string;
}

export const newsData: NewsItem[] = [
  {
    id: "1",
    image: newsImg1,
    title: "Milli Aviasiya Akademiyasının təqaüdçüləri ilə görüş keçirildi",
    excerpt: "Milli Aviasiya Akademiyasının təşkilatçılığı ilə aviasiya sahəsində gənc mütəxəssislərin iştirakı ilə konfrans keçirilmişdir. Tədbirdə müxtəlif ölkələrdən nümayəndələr iştirak edib...",
    type: "News",
    sharingTime: "2026-11-06T10:19:00Z",
    status: "Active",
    publishStatus: "Publish",
    author: "snovruzlu"
  },
  {
    id: "2",
    image: newsImg2,
    title: "Akademiyada yeni tədris korpusu istifadəyə verildi",
    excerpt: "Milli Aviasiya Akademiyasının təşkilatçılığı ilə aviasiya sahəsində gənc mütəxəssislərin iştirakı ilə konfrans keçirilmişdir. Tədbirdə müxtəlif ölkələrdən nümayəndələr iştirak edib...",
    type: "Announcement",
    sharingTime: "2026-11-05T09:45:00Z",
    status: "Active",
    publishStatus: "Publish",
    author: "snovruzlu"
  },
  {
    id: "3",
    image: newsImg3,
    title: "Tələbələr üçün yeni kitabxana açıldı",
    excerpt: "Milli Aviasiya Akademiyasının təşkilatçılığı ilə aviasiya sahəsində gənc mütəxəssislərin iştirakı ilə konfrans keçirilmişdir. Tədbirdə müxtəlif ölkələrdən nümayəndələr iştirak edib...",
    type: "News",
    sharingTime: "2026-11-04T14:30:00Z",
    status: "Inactive",
    publishStatus: "Draft",
    author: "snovruzlu"
  },
  {
    id: "4",
    image: newsImg4,
    title: "Milli Aviasiya Akademiyasının təqaüdçüləri ilə görüş keçirildi",
    excerpt: "Milli Aviasiya Akademiyasının təşkilatçılığı ilə aviasiya sahəsində gənc mütəxəssislərin iştirakı ilə konfrans keçirilmişdir. Tədbirdə müxtəlif ölkələrdən nümayəndələr iştirak edib...",
    type: "News",
    sharingTime: "2026-11-06T10:19:00Z",
    status: "Active",
    publishStatus: "Publish",
    author: "snovruzlu"
  },
  {
    id: "5",
    image: newsImg3,
    title: "Akademiyada yeni tədris korpusu istifadəyə verildi",
    excerpt: "Milli Aviasiya Akademiyasının təşkilatçılığı ilə aviasiya sahəsində gənc mütəxəssislərin iştirakı ilə konfrans keçirilmişdir. Tədbirdə müxtəlif ölkələrdən nümayəndələr iştirak edib...",
    type: "Announcement",
    sharingTime: "2026-11-05T09:45:00Z",
    status: "Active",
    publishStatus: "Publish",
    author: "snovruzlu"
  },
  {
    id: "6",
    image: newsImg5,
    title: "Tələbələr üçün yeni kitabxana açıldı",
    excerpt: "Milli Aviasiya Akademiyasının təşkilatçılığı ilə aviasiya sahəsində gənc mütəxəssislərin iştirakı ilə konfrans keçirilmişdir. Tədbirdə müxtəlif ölkələrdən nümayəndələr iştirak edib...",
    type: "News",
    sharingTime: "2026-11-04T14:30:00Z",
    status: "Inactive",
    publishStatus: "Draft",
    author: "snovruzlu"
  },
  {
    id: "7",
    image: newsImg1,
    title: "Milli Aviasiya Akademiyasının təqaüdçüləri ilə görüş keçirildi",
    excerpt: "Milli Aviasiya Akademiyasının təşkilatçılığı ilə aviasiya sahəsində gənc mütəxəssislərin iştirakı ilə konfrans keçirilmişdir. Tədbirdə müxtəlif ölkələrdən nümayəndələr iştirak edib...",
    type: "News",
    sharingTime: "2026-11-06T10:19:00Z",
    status: "Active",
    publishStatus: "Publish",
    author: "snovruzlu"
  },
  {
    id: "9",
    image: newsImg3,
    title: "Tələbələr üçün yeni kitabxana açıldı",
    excerpt: "Milli Aviasiya Akademiyasının təşkilatçılığı ilə aviasiya sahəsində gənc mütəxəssislərin iştirakı ilə konfrans keçirilmişdir. Tədbirdə müxtəlif ölkələrdən nümayəndələr iştirak edib...",
    type: "News",
    sharingTime: "2026-11-04T14:30:00Z",
    status: "Inactive",
    publishStatus: "Draft",
    author: "snovruzlu"
  },
  {
    id: "8",
    image: newsImg2,
    title: "Akademiyada yeni tədris korpusu istifadəyə verildi",
    excerpt: "Milli Aviasiya Akademiyasının təşkilatçılığı ilə aviasiya sahəsində gənc mütəxəssislərin iştirakı ilə konfrans keçirilmişdir. Tədbirdə müxtəlif ölkələrdən nümayəndələr iştirak edib...",
    type: "Announcement",
    sharingTime: "2026-11-05T09:45:00Z",
    status: "Active",
    publishStatus: "Publish",
    author: "snovruzlu"
  },
  {
    id: "10",
    image: newsImg4,
    title: "Milli Aviasiya Akademiyasının təqaüdçüləri ilə görüş keçirildi",
    excerpt: "Milli Aviasiya Akademiyasının təşkilatçılığı ilə aviasiya sahəsində gənc mütəxəssislərin iştirakı ilə konfrans keçirilmişdir. Tədbirdə müxtəlif ölkələrdən nümayəndələr iştirak edib...",
    type: "News",
    sharingTime: "2026-11-06T10:19:00Z",
    status: "Active",
    publishStatus: "Publish",
    author: "snovruzlu"
  },
  {
    id: "11",
    image: newsImg3,
    title: "Akademiyada yeni tədris korpusu istifadəyə verildi",
    excerpt: "Milli Aviasiya Akademiyasının təşkilatçılığı ilə aviasiya sahəsində gənc mütəxəssislərin iştirakı ilə konfrans keçirilmişdir. Tədbirdə müxtəlif ölkələrdən nümayəndələr iştirak edib...",
    type: "Announcement",
    sharingTime: "2026-11-05T09:45:00Z",
    status: "Active",
    publishStatus: "Publish",
    author: "snovruzlu"
  },
  {
    id: "12",
    image: newsImg5,
    title: "Tələbələr üçün yeni kitabxana açıldı",
    excerpt: "Milli Aviasiya Akademiyasının təşkilatçılığı ilə aviasiya sahəsində gənc mütəxəssislərin iştirakı ilə konfrans keçirilmişdir. Tədbirdə müxtəlif ölkələrdən nümayəndələr iştirak edib...",
    type: "News",
    sharingTime: "2026-11-04T14:30:00Z",
    status: "Inactive",
    publishStatus: "Draft",
    author: "snovruzlu"
  },
  {
    id: "13",
    image: newsImg1,
    title: "Milli Aviasiya Akademiyasının təqaüdçüləri ilə görüş keçirildi",
    excerpt: "Milli Aviasiya Akademiyasının təşkilatçılığı ilə aviasiya sahəsində gənc mütəxəssislərin iştirakı ilə konfrans keçirilmişdir. Tədbirdə müxtəlif ölkələrdən nümayəndələr iştirak edib...",
    type: "News",
    sharingTime: "2026-11-06T10:19:00Z",
    status: "Active",
    publishStatus: "Publish",
    author: "snovruzlu"
  },
  {
    id: "14",
    image: newsImg2,
    title: "Akademiyada yeni tədris korpusu istifadəyə verildi",
    excerpt: "Milli Aviasiya Akademiyasının təşkilatçılığı ilə aviasiya sahəsində gənc mütəxəssislərin iştirakı ilə konfrans keçirilmişdir. Tədbirdə müxtəlif ölkələrdən nümayəndələr iştirak edib...",
    type: "Announcement",
    sharingTime: "2026-11-05T09:45:00Z",
    status: "Active",
    publishStatus: "Publish",
    author: "snovruzlu"
  },
  {
    id: "15",
    image: newsImg3,
    title: "Tələbələr üçün yeni kitabxana açıldı",
    excerpt: "Milli Aviasiya Akademiyasının təşkilatçılığı ilə aviasiya sahəsində gənc mütəxəssislərin iştirakı ilə konfrans keçirilmişdir. Tədbirdə müxtəlif ölkələrdən nümayəndələr iştirak edib...",
    type: "News",
    sharingTime: "2026-11-04T14:30:00Z",
    status: "Inactive",
    publishStatus: "Draft",
    author: "snovruzlu"
  },
  {
    id: "16",
    image: newsImg4,
    title: "Milli Aviasiya Akademiyasının təqaüdçüləri ilə görüş keçirildi",
    excerpt: "Milli Aviasiya Akademiyasının təşkilatçılığı ilə aviasiya sahəsində gənc mütəxəssislərin iştirakı ilə konfrans keçirilmişdir. Tədbirdə müxtəlif ölkələrdən nümayəndələr iştirak edib...",
    type: "News",
    sharingTime: "2026-11-06T10:19:00Z",
    status: "Active",
    publishStatus: "Publish",
    author: "snovruzlu"
  },
  {
    id: "18",
    image: newsImg5,
    title: "Tələbələr üçün yeni kitabxana açıldı",
    excerpt: "Milli Aviasiya Akademiyasının təşkilatçılığı ilə aviasiya sahəsində gənc mütəxəssislərin iştirakı ilə konfrans keçirilmişdir. Tədbirdə müxtəlif ölkələrdən nümayəndələr iştirak edib...",
    type: "News",
    sharingTime: "2026-11-04T14:30:00Z",
    status: "Inactive",
    publishStatus: "Draft",
    author: "snovruzlu"
  },
  {
    id: "17",
    image: newsImg3,
    title: "Akademiyada yeni tədris korpusu istifadəyə verildi",
    excerpt: "Milli Aviasiya Akademiyasının təşkilatçılığı ilə aviasiya sahəsində gənc mütəxəssislərin iştirakı ilə konfrans keçirilmişdir. Tədbirdə müxtəlif ölkələrdən nümayəndələr iştirak edib...",
    type: "Announcement",
    sharingTime: "2026-11-05T09:45:00Z",
    status: "Active",
    publishStatus: "Publish",
    author: "snovruzlu"
  },

];
