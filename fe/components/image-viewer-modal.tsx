"use client";

import { useState, useEffect } from "react";
// import { useImageBlobQuery, useOriginalImageURLQuery } from "@/hooks/useImages";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
// import AuthImage from "./auth-image";

export default function ImageViewerModal({
  url,
  alt,
  className,
  id,
}: {
  url: string;
  alt?: string;
  className?: string;
  id: number;
}) {
  const [open, setOpen] = useState(false);


   
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [originalObjectUrl, setOriginalObjectUrl] = useState<string | null>(null);


  /** 
   * @summary 생성된 Blob URL을 이용해 원본 이미지를 새 창으로 엽니다 
   */
  function handleOriginalView() {
    console.log("🖼️ 원본 Blob URL 열기:", originalObjectUrl);
    if (originalObjectUrl) {
      window.open(originalObjectUrl, "_blank");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        asChild
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <img src={url} alt={alt} className={`${className} cursor-pointer`} />
      </DialogTrigger>

      <DialogContent className="max-w-3xl w-full">
        <DialogHeader>
          <DialogTitle>{url.split("/").pop() || "이미지 미리보기"}</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center py-4">
          <img src={url} alt={alt} className="max-h-[80vh] object-contain" />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            disabled={!originalObjectUrl}
            onClick={handleOriginalView}
          >
            원본보기 🔍
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}