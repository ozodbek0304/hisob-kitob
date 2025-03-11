import { useForm } from "react-hook-form"
import FormInput from "../form/input";
import FormNumberInput from "../form/number-input";
import FormMoneyInput from "../form/money-input";
import DatePickerField from "../form/date-picker";
import { Button } from "../ui/button";
import { usePost } from "@/services/https";
import { SAVE_BANK_DATA } from "@/services/api-endpoints";
import { toast } from "sonner";

type UserData = {
    payer_name: string,
    receiver_name: string,
    supplier_inn: string,
    buyer_inn: string,
    price: string,
    payment_date: string,
}

const formattedNumber = (input: string) => {
    return Number(input.replace(/\D/g, ''))
};


export const DataCreate = () => {
    const form = useForm<UserData>({
        defaultValues: {
            payer_name: "",
            receiver_name: "",
            supplier_inn: "",
            buyer_inn: "",
            price: "",
            payment_date: "",
        }
    });

    const { mutate, isPending } = usePost({
        onSuccess: (data) => {
            toast.success(data?.message)
            form.reset()

        }
    })

    const handleSubmit = (values: UserData) => {
        mutate(SAVE_BANK_DATA, {
            ...values,
            price: formattedNumber(values?.price)
        })
    }


    return (
        <div>
            <h1 className="mb-3 lg:text-2xl text-lg  text-center">Faktura ma'lumotlarini kiriting!</h1>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="border  space-y-4 p-6 rounded-xl ">
                <FormInput required label="To'lovchi nomi" methods={form} placeholder="To'lovchi nomi" name="payer_name" />
                <FormInput required label="Qabul qiluvchining nomi" methods={form} placeholder="Qabul qiluvchining nomi" name="receiver_name" />
                <FormNumberInput maxLength={11} required label="Yetkazib beruvchi INN" methods={form} placeholder="Yetkazib beruvchi INN" name="supplier_inn" />
                <FormNumberInput maxLength={11} required label="Xaridor INN" methods={form} placeholder="Xaridor INN" name="buyer_inn" />
                <FormMoneyInput required label="Narx" methods={form} placeholder="Narx" name="price" />
                <DatePickerField required methods={form} placeholderText="To'lov sanasi" label="To'lov sanasi" name="payment_date" />
                <div className="w-full flex justify-end">
                    <Button
                        loading={isPending}
                        disabled={isPending}
                        type="submit" className="px-8  dark:text-white dark:bg-[#262730]">
                        {isPending ? "Tekshirilmoqda" : "Saqlash"}
                    </Button>
                </div>
            </form>

        </div>
    )
}