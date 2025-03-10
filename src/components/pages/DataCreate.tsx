import { useForm } from "react-hook-form"
import FormInput from "../form/input";
import FormNumberInput from "../form/number-input";
import FormMoneyInput from "../form/money-input";

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
            supplierINN: "100000000",
            buyerINN: "100000000",
            price: "0,01",
            paymentDate: "2025/03/10",
        }
    });

    const handleSubmit = (values: UserData) => {
        console.log(values);

    }


    return (
        <div className="p-12">
            <form onSubmit={form.handleSubmit(handleSubmit)} className="border h-[600px] space-y-4 p-6 rounded-xl border-gray-300">
                <FormInput label="To'lovchi nomi" methods={form} placeholder="To'lovchi nomi" name="payerName" />
                <FormInput label="Qabul qiluvchining nomi" methods={form} placeholder="Qabul qiluvchining nomi" name="receiverName" />
                <FormNumberInput label="Yetkazib beruvchi INN" methods={form} placeholder="Yetkazib beruvchi INN" name="supplierINN" />
                <FormNumberInput label="Xaridor INN" methods={form} placeholder="Xaridor INN" name="buyerINN" />
                <FormMoneyInput label="Narx" methods={form} placeholder="Narx" name="price" />
            </form>

        </div>
    )
}