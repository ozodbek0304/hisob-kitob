"use client"

import { Input } from "@/components/ui/input"
import { Label } from "../ui/label"
import DataTable from "@/custom/table"

export default function FinancialTracker() {

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
                    <Input name="Inn_1" fullWidth placeholder="Sotib oluvchi INN" />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <Label htmlFor="Inn_1">
                        Yetkazib beruvchi INN
                    </Label>
                    <Input name="Inn_1" fullWidth placeholder="Yetkazib beruvchi INN" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div className="w-full">
                    <div className="mt-8 mb-4">
                        <h1 className="text-2xl font-bold mb-2">Qarzdorlik: 0</h1>
                        <h3 className="text-md mb-4 text-gray-600 dark:text-white">Tushum</h3>
                    </div>
                    <DataTable isSuccess={true} columns={columnsLefts} data={data} />
                </div>

                <div className="w-full">
                    <div className="mt-8 mb-4">
                        <h1 className="text-2xl font-bold mb-2">Qarzdorlik: 0</h1>
                        <h3 className="text-md mb-4 text-gray-600 dark:text-white">Xarajat</h3>
                    </div>
                    <DataTable isSuccess={true} columns={columnsRights} data={data} />
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                <DataTable isSuccess={true} columns={columnsLefts2} data={data2} />
                <DataTable isSuccess={true} columns={columnsRights2} data={data2} />
            </div>
        </div>
    )
}

