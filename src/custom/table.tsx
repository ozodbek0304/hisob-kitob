"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Download, Maximize, Minimize2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { downloadExcel } from "@/lib/download-excel"
import { useGet } from "@/services/https"
import { TRANSACTIONS_EXCEL } from "@/services/api-endpoints"

type Column = {
  key: string
  label: any
  render?: (value: any, row: { [key: string]: any }) => React.ReactNode
}

type Props = {
  columns: Column[]
  data: { [key: string]: any }[]
  isSuccess: boolean
  id: string
  hasFixedRowCount?: boolean
  filteredParams?: any
}


const DataTable = ({ data, columns, isSuccess, id, hasFixedRowCount = false, filteredParams }: Props) => {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [stateBol, setStateBol] = useState(false)
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const { data: dataDownload } = useGet(TRANSACTIONS_EXCEL, { params: { ...filteredParams, file_type: id }, options: { enabled: stateBol } })

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);

    if (!document.fullscreenElement) {
      tableContainerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleExcel = () => {
    setStateBol(true);
  }

  const rowCount = hasFixedRowCount ? 10 : data.length;
  const filledRows = isSuccess ? data.length : 0;
  const emptyRows = hasFixedRowCount ? Math.max(0, rowCount - filledRows) : 0;


  useEffect(() => {
    if (dataDownload) {
      downloadExcel(dataDownload)
    }
  }, [stateBol, dataDownload]);



  return (
    <div
      ref={tableContainerRef}
      className={`relative border rounded-md ${isFullScreen ? "fixed inset-0 z-50 bg-white  dark:bg-black overflow-auto p-4 pt-12" : ""}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && (
        <div className={`absolute  ${isFullScreen ? "top-2 right-2" : "-top-8 right-0"} pb-2  bg-transparent  z-10`}>
          <div className=" dark:bg-[#262730]  rounded-md shadow-md ">
            <button
              onClick={handleExcel}
              className=" p-1.5  transition-all duration-200 dark:hover:bg-gray-700 rounded-lg"
              aria-label={isFullScreen ? "Exit full screen" : "Enter full screen"}
            >
              <Download className="h-4 w-4 text-gray-600 dark:text-white" />
            </button>

            <button
              onClick={toggleFullScreen}
              className=" p-1.5  transition-all duration-200 dark:hover:bg-gray-700 rounded-lg"
              aria-label={isFullScreen ? "Exit full screen" : "Enter full screen"}
            >
              {isFullScreen ? (
                <Minimize2 className="h-4 w-4 text-gray-600 dark:text-white" />
              ) : (
                <Maximize className="h-4 w-4 text-gray-600 dark:text-white" />
              )}
            </button>
          </div>

        </div>
      )}

      <Table id={id} className="border w-full">
        <TableHeader className="bg-gray-100 dark:bg-[#262730] ">
          <TableRow>
            {columns.map((column) => (
              <TableHead
                className="text-center text-gray-400 dark:bg-[#262730] font-normal border dark:border-[#262730]"
                key={column.key}
              >
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {(isSuccess && data?.length > 0) ?
            data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    className={"border text-gray-400 dark:border-[#262730] font-normal max-w-[300px]"}
                  >
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            )) :
            <TableRow >
              <TableCell
                className={"border text-center text-red-600 dark:border-[#262730] font-normal max-w-[300px]"}
              >
                Ma'lumot topilmadi
              </TableCell>
              <TableCell
                className={"border text-center text-red-600 dark:border-[#262730] font-normal max-w-[300px]"}
              >
                0
              </TableCell>
            </TableRow>

          }

          {hasFixedRowCount &&
            [...Array(emptyRows)].map((_, index) => (
              <TableRow key={`empty-${index}`}>
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    className="border text-gray-400 dark:border-[#262730] font-normal max-w-[300px] text-start"
                  >
                    ⎯
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

