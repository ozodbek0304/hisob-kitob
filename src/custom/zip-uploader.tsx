"use client"

import { useState, useRef, type DragEvent, type ChangeEvent } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ZipUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const MAX_FILE_SIZE = 200 * 1024 * 1024 // 200MB in bytes

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
    // Check if file is a ZIP
    if (!file.name.endsWith(".zip")) {
      alert("Faqat ZIP fayllari qabul qilinadi")
      return
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      alert("Fayl hajmi 200MB dan oshmasligi kerak")
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

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 100
        }
        return prev + 5
      })
    }, 200)

    // In a real application, you would upload the file to your server here
    // const formData = new FormData()
    // formData.append('file', file)
    // await fetch('/api/upload', { method: 'POST', body: formData })
  }

  const handleReset = () => {
    setFile(null)
    setIsUploading(false)
    setUploadProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="w-full ">
      <p className="text-sm font-medium mb-2">ZIP fayl yuklash</p>

      <div
        className={`border-2 border-none  bg-white dark:bg-slate-950 rounded-lg p-6 mb-4 text-center transition-colors
          ${isDragging ? "border-primary bg-primary/5" : "border-gray-300"}
          ${file ? "bg-green-50 border-green-300" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!file ? (
          <>
            <p className="text-md font-medium mb-1">Faylni shu yerga tashlang</p>
            <p className="text-[12px] text-muted-foreground mb-4">Fayl hajmi 200MB gacha • ZIP</p>

            <Button
              variant="outline"
              onClick={handleBrowseClick}
              className="border-gray-400  w-full bg-gray-50 dark:bg-[#262730] hover:border-red-500  hover:bg-red-50 hover:text-red-600"
            >
              Fayllarni ko'rish
            </Button>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".zip" className="hidden" />
          </>
        ) : (
          <div className="py-2">
            <p className="font-medium mb-1">{file.name}</p>
            <p className="text-sm text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>

            {isUploading && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex w-full  gap-4">
        <Button variant="outline" onClick={handleStartUpload} disabled={!file || isUploading} className="border-gray-400  w-full bg-gray-50 dark:bg-[#262730] hover:border-red-500  hover:bg-red-50 hover:text-red-600">
          Boshlash
        </Button>

        <Button variant="outline" onClick={handleReset} className="border-gray-400  w-full bg-gray-50 dark:bg-[#262730] hover:border-red-500  hover:bg-red-50 hover:text-red-600">
          Tozalash
        </Button>
      </div>
    </div>
  )
}

