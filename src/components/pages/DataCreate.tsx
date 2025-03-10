import { useForm } from "react-hook-form"
import FormInput from "../form/input";
import FormNumberInput from "../form/number-input";
import FormMoneyInput from "../form/money-input";
import DatePickerField from "../form/date-picker";
import { Button } from "../ui/button";

type UserData = {
    payerName: string,
    receiverName: string,
    supplierINN: string,
    buyerINN: string,
    price: string,
    paymentDate: string,
}


export const DataCreate = () => {
    const form = useForm<UserData>({
        defaultValues: {
            payerName: "",
            receiverName: "",
            supplierINN: "",
            buyerINN: "",
            price: "",
            paymentDate: "",
        }
    });

    const handleSubmit = (values: UserData) => {
        console.log(values);

    }


    return (
        <div>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="border  space-y-4 p-6 rounded-xl ">
                <FormInput required label="To'lovchi nomi" methods={form} placeholder="To'lovchi nomi" name="payerName" />
                <FormInput required label="Qabul qiluvchining nomi" methods={form} placeholder="Qabul qiluvchining nomi" name="receiverName" />
                <FormNumberInput maxLength={11}  required label="Yetkazib beruvchi INN" methods={form} placeholder="Yetkazib beruvchi INN" name="supplierINN" />
                <FormNumberInput maxLength={11} required label="Xaridor INN" methods={form} placeholder="Xaridor INN" name="buyerINN" />
                <FormMoneyInput  required label="Narx" methods={form} placeholder="Narx" name="price" />
                <DatePickerField required methods={form} placeholderText="To'lov sanasi" label="To'lov sanasi" name="paymentDate" />
                <div className="w-full flex justify-end">
                    <Button type="submit" className="px-8  dark:text-white dark:bg-[#262730]">Yuborish</Button>
                </div>
            </form>

        </div>
    )
}