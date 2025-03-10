"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Maximize2, Minimize2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Column = {
  key: string
  label: any
  render?: (value: any, row: { [key: string]: any }) => React.ReactNode
}

type Props = {
  columns: Column[]
  data: { [key: string]: any }[]
  isSuccess: boolean
}

const DataTable = ({ data, columns, isSuccess }: Props) => {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const tableContainerRef = useRef<HTMLDivElement>(null)

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);

    if (!document.fullscreenElement) {
      tableContainerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };


  return (
    <div
      ref={tableContainerRef}
      className={`relative border rounded-md ${isFullScreen ? "fixed inset-0 z-50 bg-white dark:bg-[#ACB1C340] overflow-auto p-4" : ""}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && (
        <button
          onClick={toggleFullScreen}
          className="absolute top-1 right-1 z-10 p-1.5 bg-white dark:bg-[#262730] rounded-md shadow-md hover:bg-gray-100 dark:hover:bg-slate-900 transition-all duration-200"
          aria-label={isFullScreen ? "Exit full screen" : "Enter full screen"}
        >
          {isFullScreen ? (
            <Minimize2 className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          ) : (
            <Maximize2 className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      )}

      <Table className="border w-full">
        <TableHeader className="bg-gray-100 dark:bg-[#262730] ">
          <TableRow>
            {columns.map((column) => (
              <TableHead
                className="text-center text-gray-500 dark:bg-[#262730] font-normal border dark:border-[#262730]"
                key={column.key}
              >
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isSuccess &&
            data?.length > 0 &&
            data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    className={"border text-gray-500 dark:border-[#262730] font-normal max-w-[300px]"}
                  >
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default DataTable

