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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate, isPending: isLoading } = usePost({
    onSuccess: (data) => {
      toast.success(data?.message);
      handleReset();
    },
  },
    {
      headers: { "Content-Type": "multipart/form-data" },
    }

  );

  const MAX_FILE_SIZE = 1000 * 1024 * 1024;

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelection(e.dataTransfer.files);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileSelection(e.target.files);
    }
  };

  const handleFileSelection = (selectedFiles: FileList) => {
    const validFiles = Array.from(selectedFiles).filter((file) => file.size <= MAX_FILE_SIZE);
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
    files.forEach((file) => zip.file(file.name, file));

    const zipBlob = await zip.generateAsync({ type: "blob" });

    console.log(zipBlob);

    const formData = new FormData();
    formData.append("file", zipBlob, "files.zip");

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

  console.log(files);


  return (
    <div className="w-full">
      <div
        className={`border-2 bg-white dark:bg-background rounded-lg p-6 mb-4 text-center transition-colors
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
              Fayllarni yuklash
            </Button>
            <input type="file" ref={fileInputRef}
              multiple
              onChange={handleFileChange}
              className="hidden" />
          </>
        ) : (
          <div className="py-2">
            {files.map((file, index) => (
              <p key={index} className="font-medium mb-1">
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
        <Button
          variant="outline"
          onClick={handleStartUpload}
          disabled={files.length === 0 || isUploading}
          className="border-gray-400 w-full bg-gray-50 dark:bg-[#262730] hover:border-green-500 hover:bg-green-50 hover:text-green-600"
        >
          Boshlash
        </Button>
        <Button
          variant="outline"
          onClick={handleReset}
          className="border-gray-400 w-full bg-gray-50 dark:bg-[#262730] hover:border-red-500 hover:bg-red-50 hover:text-red-600"
        >
          Tozalash
        </Button>
      </div>
    </div>
  );
}
