import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { api } from "./client";
import type { NewsItem } from "../mocks/newsData";
import { api } from "../api/client";

// -------------------
// Fetch news
// -------------------
export const useNews = (params?: Record<string, string | number | null>) => {
  return useQuery<NewsItem[], Error>({
    queryKey: ["news", params],
    queryFn: async () => {
      const search = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value != null) search.set(key, String(value));
        });
      }
      const res = await api.get(`/api/news?${search.toString()}`);
      return res.data as NewsItem[];
    },
  });
};

// -------------------
// Create news
// -------------------
export const useCreateNews = () => {
  const queryClient = useQueryClient();
  return useMutation<NewsItem, Error, Partial<NewsItem>>({
    mutationFn: async (payload) => {
      const res = await api.post("/api/news", payload);
      return res.data as NewsItem;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
};

// -------------------
// Update news
// -------------------
export const useUpdateNews = () => {
  const queryClient = useQueryClient();
  return useMutation<NewsItem, Error, { id: string; payload: Partial<NewsItem> }>({
    mutationFn: async ({ id, payload }) => {
      const res = await api.put(`/api/news/${id}`, payload);
      return res.data as NewsItem;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
};

// -------------------
// Delete news
// -------------------
export const useDeleteNews = () => {
  const queryClient = useQueryClient();
  return useMutation<NewsItem, Error, string>({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/api/news/${id}`);
      return res.data as NewsItem;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
};
