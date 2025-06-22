// hooks/useInfiniteImages.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { mockImages } from "@/lib/mock-image-data";

const PAGE_SIZE = 20;

export const useInfiniteImages = () => {
  return useInfiniteQuery({
    queryKey: ["images"],
    queryFn: ({ pageParam = 0 }) => {
      const start = pageParam * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const data = mockImages.slice(start, end);
      const hasMore = end < mockImages.length;

      return Promise.resolve({
        data,
        nextPage: hasMore ? pageParam + 1 : undefined,
      });
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });
};
