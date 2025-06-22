"use client";
import { useEffect, useMemo, useState } from "react";
import EditImageTable from "@/components/image-table";
import { useInfiniteImages } from "@/app/queries/useInfiniteImages";

export default function TestPage() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteImages();

  const images = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? [];
  }, [data]);

  const [rowSelection, setRowSelection] = useState<Record<number, boolean>>({});

  // ✍️ 이미지 이름 수정 핸들러
  const handleEditImageName = (image: any, imageName: string) => {
    console.log("✏️ 이름 수정:", image.id, imageName);
  };

  return (
    <div>
      <EditImageTable
        data={images}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        isDisabled={false}
        fetchNextPage={fetchNextPage}
        hasNextPage={!!hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
        handleEditImageName={handleEditImageName}
      />
    </div>
  );
}
