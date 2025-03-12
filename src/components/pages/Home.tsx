"use client"

import { Label } from "../ui/label"
import DataTable from "@/custom/table"
import { useGet } from "@/services/https"
import { TRANSACTIONS } from "@/services/api-endpoints"
import { cn } from "@/lib/utils"
import { NumericFormat } from "react-number-format"
import { useMemo, useState } from "react"
import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react"
import { addPeriodToThousands } from "@/lib/price-formatter"

export default function FinancialTracker() {

    const [queryINN, setQueryINN] = useState<{ buyer_inn?: number, supplier_inn?: number }>({ buyer_inn: 0, supplier_inn: 0 });
    const filteredParams = Object.fromEntries(
        Object.entries(queryINN).filter(([_, value]) => value !== 0)
    );
    const { data: dataTransactions, isSuccess } = useGet(TRANSACTIONS, { params: filteredParams });


    const columnsLefts = () => {
        return useMemo(() => [
            {
                key: "name",
                label: "Jami Topshirilgan Faktura",
            },
            {
                key: "price",
                label: "Jami Kirim",
                render: (value: number) => (
                    <span>{addPeriodToThousands(value)}</span>
                )
            },
        ], [])
    }

    const columnsRights = () => {
        return useMemo(() => [
            {
                key: "name",
                label: "Jami Topshirilgan Faktura",
            },
            {
                key: "price",
                label: "Jami Chiqim",
                render: (value: number) => (
                    <span>{addPeriodToThousands(value)}</span>
                )
            },
        ], [])
    }


    const columnsLefts2 = () => {
        return useMemo(() => [
            {
                key: "name",
                label: "Qabul Qilingan Faktura",
                render: (value: number) => (
                    <span>{addPeriodToThousands(value)}</span>
                )
            },
            {
                key: "price",
                label: "Bank DB",
                render: (value: number) => (
                    <span>{addPeriodToThousands(value)}</span>
                )
            },
        ], [])
    }

    const columnsRigth2 = () => {
        return useMemo(() => [
            {
                key: "name",
                label: "Qabul Qilingan Faktura",
                render: (value: number) => (
                    <span>{addPeriodToThousands(value)}</span>
                )
            },
            {
                key: "price",
                label: "Bank KB",
                render: (value: number) => (
                    <span>{addPeriodToThousands(value)}</span>
                )
            },
        ], []
        )
    }

    const dataCredit = isSuccess && dataTransactions.invoice.map((item: any, index: number) => ({
        name: item.price,
        price: dataTransactions.credit[index]?.price || "⎯",
    }));

    const dataDb = isSuccess && dataTransactions.invoice.map((item: any, index: number) => ({
        name: item.price,
        price: dataTransactions.debit[index]?.price || "⎯",
    }));



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
                        <h1 className="text-2xl font-bold mb-2 dark:text-white"><span>Qarzdorlik:</span> <span>{addPeriodToThousands(dataTransactions?.diff_debit)}</span> </h1>
                        <h3 className="text-md mb-6 dark:text-white flex items-center gap-1"><span>Tushum</span> <ArrowDownToLine className="h-4 w-4" /></h3>
                    </div>
                    <DataTable id="3" isSuccess={isSuccess} columns={columnsLefts()} data={[{ name: addPeriodToThousands(dataTransactions?.invoice_total), price: (dataTransactions?.credit_total) }]} />
                </div>

                <div className="w-full">
                    <div className="mt-8 mb-4">
                        <h1 className="text-2xl font-bold mb-2 dark:text-white"><span>Qarzdorlik:</span> <span>{addPeriodToThousands(dataTransactions?.diff_credit)}</span> </h1>
                        <h3 className="text-md mb-6 dark:text-white flex items-center gap-1"><span>Xarajat</span> <ArrowUpFromLine className="h-4 w-4" /></h3>
                    </div>
                    <DataTable id="3" isSuccess={isSuccess} columns={columnsRights()} data={[{ name: addPeriodToThousands(dataTransactions?.invoice_total), price: dataTransactions?.debit_total }]} />
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
                <DataTable id="2" filteredParams={filteredParams} isSuccess={isSuccess} hasFixedRowCount columns={columnsLefts2()}
                    data={dataDb}
                />
                <DataTable id="1" filteredParams={filteredParams} isSuccess={isSuccess} hasFixedRowCount columns={columnsRigth2()} data={dataCredit} />
            </div>

        </div>
    )
}

