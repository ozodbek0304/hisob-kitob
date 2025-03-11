"use client"

import { useState, useRef, useEffect, type DragEvent, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { usePost } from "@/services/https"
import { UPLOAD } from "@/services/api-endpoints"
import { toast } from "sonner"

export default function ZipUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const { mutate, isPending: isLoading } = usePost({
    onSuccess: (data) => {
      toast.success(data?.message)
      handleReset()
    }
  },
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  )

  const MAX_FILE_SIZE = 1000 * 1024 * 1024

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [])

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    validateAndSetFile(droppedFile)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0])
    }
  }

  const validateAndSetFile = (file: File) => {
    if (!file.name.endsWith(".zip")) {
      toast.warning("Faqat ZIP fayllari qabul qilinadi")
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.warning("Fayl hajmi 1000 MB dan oshmasligi kerak")
      return
    }

    setFile(file)
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const handleStartUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)

    progressIntervalRef.current = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          return 95
        }
        return prev + 1
      })
    }, 100)

    const formData = new FormData()
    formData.append("file", file)

    mutate(UPLOAD, formData)
  }

  const handleReset = () => {
    setFile(null)
    setIsUploading(false)
    setUploadProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }
  }

  useEffect(() => {
    if (!isLoading && isUploading) {
      setUploadProgress(100)
      setTimeout(() => {
        setIsUploading(false)
        setUploadProgress(0)
      }, 500)
    }
  }, [isLoading, isUploading])

  return (
    <div className="w-full ">

      <div
        className={`border-2 border-none  bg-white dark:bg-background rounded-lg p-6 mb-4 text-center transition-colors
          ${isDragging ? "border-primary bg-primary/5" : "border-gray-300"}
          ${file ? "bg-green-50 border-green-300" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!file ? (
          <>
            <p className="text-[12px] text-muted-foreground mb-4">Fayl hajmi 1000 MB gacha • ZIP</p>

            <Button
              variant="outline"
              onClick={handleBrowseClick}
              className="border-gray-400  w-full bg-gray-50 dark:bg-[#262730] hover:border-red-500  hover:bg-red-50 hover:text-red-600"
            >
              Fayllarni yuklash
            </Button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".zip" className="hidden" />
          </>
        ) : (
          <div className="py-2">
            <p className="font-medium mb-1">{file.name}</p>
            <p className="text-sm text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>

            {isUploading && (
                <div className="w-full dark:bg-gray-700 rounded-lg h-2.5 mt-3 ">
                <div
                  className="bg-green-500 h-2.5 relative rounded-lg transition-all duration-300 ease-in-out"
                  style={{ width: `${uploadProgress}%` }}
                >
                  <span className="text-[10px] top-[50%] translate-y-[-50%] right-2 absolute">{`${uploadProgress}%`}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>


      <div className="flex w-full  gap-4">
        <Button
          variant="outline"
          onClick={handleStartUpload}
          loading={isUploading}
          disabled={!file || isUploading}
          className="border-gray-400  w-full bg-gray-50 dark:bg-[#262730] hover:border-green-500  hover:bg-red-50 hover:text-green-600"
        >
          {"Boshlash"}
        </Button>
        <Button
          variant="outline"
          onClick={handleReset}
          className="border-gray-400  w-full bg-gray-50 dark:bg-[#262730] hover:border-red-500  hover:bg-red-50 hover:text-red-600"
        >
          Tozalash
        </Button>




      </div>
    </div>
  )
}

