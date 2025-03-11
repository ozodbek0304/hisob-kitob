import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { uz } from "date-fns/locale/uz"
import { Calendar } from "lucide-react"
import DatePicker, {
    DatePickerProps,
    registerLocale,
    setDefaultLocale,
} from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {
    FieldValues,
    Path,
    useController,
    UseFormReturn,
} from "react-hook-form"
import ErrorMessage from "../ui/error-message"
import { Label } from "../ui/label"

setDefaultLocale("uz")
registerLocale("uz", uz)

interface IProps<IForm extends FieldValues> {
    methods: UseFormReturn<IForm>
    name: Path<IForm>
    label?: string
    required?: boolean
    wrapperClass?: string
    hideError?: boolean
    disableFormat?: boolean
}


const SERVER_DATE_FORMAT = "yyyy-MM-dd"
export default function DatePickerField<IForm extends FieldValues>({
    name,
    methods,
    label,
    required = false,
    className,
    wrapperClass,
    wrapperClassName,
    clearButtonClassName,
    hideError,
    disableFormat,
    ...props
}: IProps<IForm> & Partial<DatePickerProps>) {
    const { control } = methods
    const {
        field: { value, onChange, ...field },
        fieldState: { error },
    } = useController({
        name,
        control,
        rules: {
            required: {
                value: required,
                message: "Ushbu maydon to'ldirilishi shart",
            },
        },
    })

    const selected = value ? new Date(value) : undefined

    const handleOnchange = (date: Date | null) => {
        if (date) {
            const formattedDate = format(date, SERVER_DATE_FORMAT)
            onChange(disableFormat ? date : formattedDate)
        } else {
            onChange(undefined)
        }
    }
    return (
        <fieldset className={cn("flex flex-col gap-1", wrapperClass)}>
            {label && (
                <Label
                    htmlFor={name}
                    className={cn(!!error && "text-red-600",
                        "cursor-pointer",
                        "text-sm font-semibold",
                    )}
                    required={required}
                >
                    {label}
                </Label>
            )}
            <div className="relative flex items-center">
                {/* @ts-expect-error sdf */}
                <DatePicker
                    locale={"uz"}
                    selected={selected}
                    className={cn(
                        "h-9 w-full rounded-md border border-input bg-background dark:bg-[#262730]  px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                        className,
                    )}
                    wrapperClassName={cn("w-full ", wrapperClassName)}
                    clearButtonClassName={cn(
                        "!right-7 after:!bg-transparent after:!text-primary after:!text-xl ",
                        clearButtonClassName,
                    )}
                    isClearable
                    showMonthDropdown
                    showYearDropdown
                    popperPlacement="bottom-end"
                    onChange={handleOnchange}
                    dateFormat={SERVER_DATE_FORMAT}
                    id={name}
                    dropdownMode="select"
                    placeholderText={format(new Date(), SERVER_DATE_FORMAT)}
                    autoComplete="off"
                    {...field}
                    ref={undefined}
                    {...props}
                />
                <label
                    htmlFor={name}
                    className={cn(
                        "absolute right-3 opacity-50",
                        props.disabled && "cursor-not-allowed",
                    )}
                >
                    <Calendar size={16} />
                </label>
            </div>
            {!!error && !hideError && (
                <ErrorMessage>
                    {error.message || error.root?.message}
                </ErrorMessage>
            )}
        </fieldset>
    )
}