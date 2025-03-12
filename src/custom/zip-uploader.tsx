"use client";

import { useState, useRef, useEffect, type DragEvent, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { usePost } from "@/services/https";
import { UPLOAD } from "@/services/api-endpoints";
import { toast } from "sonner";
import JSZip from "jszip";

export default function ZipUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadMode, setUploadMode] = useState<"file" | "folder">("file");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate, isPending: isLoading } = usePost({
    onSuccess: () => {
      toast.success("Muvaffaqiyatli yuklandi!");
      handleReset();
    },
  },
    {
      headers: {
        "Accept": "application/json",
        "Content-Type": "multipart/form-data"
      },

    }
  );

  const MAX_FILE_SIZE = 1000 * 1024 * 1024;

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelection(Array.from(e.dataTransfer.files));
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFileSelection(selectedFiles);
    }
  };

  const handleFolderChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const folderFiles = Array.from(e.target.files);
      handleFileSelection(folderFiles);
    }
  };

  const handleFileSelection = (selectedFiles: File[]) => {
    const validFiles = selectedFiles.filter((file) => file.size <= MAX_FILE_SIZE);
    if (validFiles.length === 0) {
      toast.warning("Fayllar hajmi 1000 MB dan oshmasligi kerak");
      return;
    }
    setFiles(validFiles);
  };


  const handleStartUpload = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);


    const zip = new JSZip();
    let zipNeeded = false;

    files.forEach((file) => {
      const isZipFile = file.name.toLowerCase().endsWith(".zip");
      if (!isZipFile) {
        zipNeeded = true;
        const path = uploadMode === "folder" ? file.webkitRelativePath || file.name : file.name;
        zip.file(path, file);
      }
    });
    const formData = new FormData();

    if (zipNeeded) {
      const zipBlob = await zip.generateAsync({ type: "blob" });
      formData.append("file", zipBlob, "uploaded_files.zip");
    } else {
      files.forEach((file) => {
        formData.append("file", file, file.name);
      });
    }


    mutate(UPLOAD, formData);
  };

  const handleReset = () => {
    setFiles([]);
    setIsUploading(false);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (!isLoading && isUploading) {
      setUploadProgress(100);
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
    }
  }, [isLoading, isUploading]);

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="uploadMode"
            value="file"
            checked={uploadMode === "file"}
            onChange={() => setUploadMode("file")}
          />
          <span className="text-sm">Fayl yuklash</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="uploadMode"
            value="folder"
            checked={uploadMode === "folder"}
            onChange={() => setUploadMode("folder")}
          />
          <span className="text-sm">Papka yuklash</span>
        </label>
      </div>

      <div
        className={`border-2 bg-white dark:bg-background overflow-hidden rounded-lg p-6 mb-4 text-center transition-colors
          ${isDragging ? "border-primary bg-primary/5" : "dark:border-gray-600 border"}
          ${files.length > 0 ? "bg-green-50 border-green-600" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {files.length === 0 ? (
          <>
            <p className="text-[12px] text-muted-foreground mb-4">Fayl hajmi 1000 MB gacha • ZIP</p>
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="border-gray-400 w-full bg-gray-50 dark:bg-[#262730] hover:border-red-500 hover:bg-red-50 hover:text-red-600"
            >
              {uploadMode === "file" ? "Faylni tanlang" : "Papkani tanlang"}
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              multiple
              onChange={uploadMode === "file" ? handleFileChange : handleFolderChange}
              {...(uploadMode === "folder" ? { webkitdirectory: "true", directory: "true", mozdirectory: "true" } as unknown as React.InputHTMLAttributes<HTMLInputElement> : {})}
              className="hidden"
            />
          </>
        ) : (
          <div className="py-2">
            {files.map((file, index) => (
              <p key={index} className="font-medium mb-1 break-all">
                {file.name} - {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            ))}
            {isUploading && (
              <div className="w-full dark:bg-gray-700 rounded-lg h-2.5 mt-3">
                <div
                  className="bg-green-600 h-2.5 relative rounded-lg transition-all duration-300 ease-in-out"
                  style={{ width: `${uploadProgress}%` }}
                >
                  <span className="text-[10px] top-[50%] translate-y-[-50%] right-2 absolute">{`${uploadProgress}%`}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex w-full gap-4">
        <Button className="w-full" onClick={handleStartUpload} disabled={files.length === 0 || isUploading}>
          Boshlash
        </Button>
        <Button className="w-full" onClick={handleReset}>Tozalash</Button>
      </div>
    </div>
  );
}
