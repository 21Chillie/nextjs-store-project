"use client";

import { updateImageAction } from "@/lib/server-utils";
import { Camera } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useRef } from "react";
import { toast } from "sonner";

type Props = {
  imgSrc: string;
  name: string;
  id: string;
};

export default function FieldImageUpdate({ imgSrc, name, id }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }

    const response = await updateImageAction({
      oldImgUrl: imgSrc,
      newImageFile: file,
      productId: id,
    });

    toast.success(response.message);
  };

  return (
    <>
      <div className="w-fit space-y-1 text-center">
        <button
          type="button"
          className="bg-foreground/10 group relative flex h-[200px] w-[200px] cursor-pointer flex-col gap-2 rounded-xl border p-2"
          onClick={openFilePicker}>
          <Image
            className="h-full w-full rounded-md object-cover"
            src={imgSrc}
            width={200}
            height={200}
            alt={`${name} product`}
          />

          <div className="absolute inset-2 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <Camera className="h-6 w-6 text-white" />
          </div>
        </button>

        <span className="text-muted-foreground text-xs font-medium">
          Click to change product image
        </span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        id="image"
        name="image"
        className="hidden"
        accept="image/*"
        onChange={handleChange}
      />
    </>
  );
}
