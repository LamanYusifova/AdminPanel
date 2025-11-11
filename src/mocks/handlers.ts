import { http, HttpResponse } from "msw";
import { newsData, type NewsItem } from "./newsData";

let DB: NewsItem[] = [...newsData];

export const handlers = [
  http.get("/api/news", ({ request }) => {
    const url = new URL(request.url);
    const type = url.searchParams.get("type");
    const status = url.searchParams.get("status");
    const q = url.searchParams.get("q") || "";

    let items = DB;
    if (type) items = items.filter(i => i.type === type);
    if (status) items = items.filter(i => i.status === status);
    if (q) items = items.filter(i => i.title.toLowerCase().includes(q.toLowerCase()));

    return HttpResponse.json({ items, total: items.length });
  }),

  http.get("/api/news/:id", ({ params }) => {
    const { id } = params;
    const found = DB.find(i => i.id === id);
    if (!found) return HttpResponse.json({ error: "Not found" }, { status: 404 });
    return HttpResponse.json(found);
  }),

  http.post("/api/news", async ({ request }) => {
    const payload = (await request.json()) as Partial<NewsItem>;

    if (!payload?.title || !payload?.type) {
      return HttpResponse.json({ error: "title and type required" }, { status: 400 });
    }

    const newItem: NewsItem = {
      id: String(Date.now()),
      image: payload.image || "https://via.placeholder.com/120x80?text=new",
      excerpt: payload.excerpt || "",
      sharingTime: payload.sharingTime || new Date().toISOString(),
      status: payload.status || "Active",
      publishStatus: payload.publishStatus || "Publish",
      author: payload.author || "unknown",
      title: payload.title,
      type: payload.type,
    };

    DB.unshift(newItem);
    return HttpResponse.json(newItem, { status: 201 });
  }),

  http.put("/api/news/:id", async ({ params, request }) => {
    const { id } = params;
    const payload = (await request.json()) as Partial<NewsItem>;

    const idx = DB.findIndex(i => i.id === id);
    if (idx === -1) {
      return HttpResponse.json({ error: "Not found" }, { status: 404 });
    }

    DB[idx] = { ...DB[idx], ...payload };
    return HttpResponse.json(DB[idx]);
  }),

  http.delete("/api/news/:id", ({ params }) => {
    const { id } = params;
    DB = DB.filter(i => i.id !== id);
    return HttpResponse.json(null, { status: 204 });
  }),
];
