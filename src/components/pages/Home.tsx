"use client"

import { Label } from "../ui/label"
import DataTable from "@/custom/table"
import { useGet } from "@/services/https"
import { TRANSACTIONS } from "@/services/api-endpoints"
import { cn } from "@/lib/utils"
import { NumericFormat } from "react-number-format"
import { useState } from "react"
import { ArrowDownToLine, ArrowUpFromLine, MoveDown, MoveUp } from "lucide-react"

export default function FinancialTracker() {

    const [queryINN, setQueryINN] = useState<{ buyer_inn?: number, supplier_inn?: number }>({ buyer_inn: 0, supplier_inn: 0 });
    const filteredParams = Object.fromEntries(
        Object.entries(queryINN).filter(([_, value]) => value !== 0)
    );
    const { data: dataTransactions } = useGet(TRANSACTIONS, { params: filteredParams, options: { enabled: Boolean(queryINN?.buyer_inn || queryINN.supplier_inn) } });

    const data = [
        {
            name: "Financial Tracker",
            amount: 100
        },
        {
            name: "Financial Tracker",
            amount: 200
        },
    ]


    const data2 = [
        {
            name: "Financial Tracker",
            amount: 100
        },
        {
            name: "Financial Tracker",
            amount: 200
        },
    ]

    const columnsLefts = [
        {
            key: "name",
            label: "Jami Topshirilgan Faktura",
        },
        {
            key: "amount",
            label: "Jami Kirim",
        },
    ]

    const columnsRights = [
        {
            key: "name",
            label: "Jami Topshirilgan Faktura",
        },
        {
            key: "amount",
            label: "Jami Chiqim",
        },
    ]

    const columnsLefts2 = [
        {
            key: "name",
            label: "Qabul Qilingan Faktura",
        },
        {
            key: "amount",
            label: "Bank DB",
        },
    ]

    const columnsRights2 = [
        {
            key: "name",
            label: "Topshirilgan Faktura",
        },
        {
            key: "amount",
            label: "Bank KR",
        },
    ]




    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="w-full flex flex-col gap-2">
                    <Label htmlFor="Inn_1">
                        Sotib oluvchi INN
                    </Label>
                    <NumericFormat
                        maxLength={11}
                        id={"Inn_1"}
                        className={cn(
                            "flex h-9 w-full rounded-md border border-input bg-background dark:bg-[#262730] px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",

                        )}
                        thousandSeparator={" "}
                        placeholder={"Sotib oluvchi INN"}
                        onValueChange={(val) => {
                            if (val) {
                                setQueryINN((prev) => ({ ...prev, buyer_inn: val.floatValue }))
                            }
                        }}
                        allowNegative={false}
                    />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <Label htmlFor="Inn_1">
                        Yetkazib beruvchi INN
                    </Label>
                    <NumericFormat
                        maxLength={11}
                        id={"Inn_1"}
                        className={cn(
                            "flex h-9 w-full rounded-md border border-input bg-background dark:bg-[#262730] px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",

                        )}
                        thousandSeparator={" "}
                        placeholder={"Yetkazib beruvchi INN"}
                        onValueChange={(val) => {
                            if (val) {
                                setQueryINN((prev) => ({ ...prev, supplier_inn: val.floatValue }))
                            }
                        }}
                        allowNegative={false}
                    />
                </div>
            </div>



            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div className="w-full">
                    <div className="mt-8 mb-4">
                        <h1 className="text-2xl font-bold mb-2 dark:text-white"><span>Qarzdorlik:</span> <span>-200 000 so'm</span> </h1>
                        <h3 className="text-md mb-6 dark:text-white flex items-center gap-1"><span>Tushum</span> <ArrowDownToLine className="h-4 w-4" /></h3>
                    </div>
                    <DataTable id="1" isSuccess={true} columns={columnsLefts} data={data} />
                </div>

                <div className="w-full">
                    <div className="mt-8 mb-4">
                    <h1 className="text-2xl font-bold mb-2 dark:text-white"><span>Qarzdorlik:</span> <span>-200 000 so'm</span> </h1>
                        <h3 className="text-md mb-6 dark:text-white flex items-center gap-1"><span>Xarajat</span> <ArrowUpFromLine className="h-4 w-4" /></h3>
                    </div>
                    <DataTable id="2" isSuccess={true} columns={columnsRights} data={data} />
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
                <DataTable id="3" isSuccess={true} hasFixedRowCount columns={columnsLefts2} data={data2} />
                <DataTable id="4" isSuccess={true} hasFixedRowCount columns={columnsRights2} data={data2} />
            </div>

        </div>
    )
}

