export interface News {
  id: string;
  title: string;
  url: string;
  category: "News" | "Announcement";
  coverImage?: string;
  content: string;
  language: "az" | "en"; // xəbər dili
  title_az: string;
  title_en: string;
  content_az: string;
  content_en: string;
}