import { cn } from "@/lib/utils"
import {
    FieldValues,
    Path,
    useController,
    UseFormReturn,
} from "react-hook-form"
import { NumericFormat, NumericFormatProps } from "react-number-format"
import { Label } from "../ui/label"
import ErrorMessage from "../ui/error-message"

interface IProps<IForm extends FieldValues> {
    methods: UseFormReturn<IForm>
    name: Path<IForm>
    label?: string
    formatOptions?: Intl.NumberFormatOptions
    wrapperClassName?: string
    hideError?: boolean
    required?: boolean
}

export default function FormNumberInput<IForm extends FieldValues>({
    methods,
    name,
    label,
    wrapperClassName,
    className,
    formatOptions,
    hideError = false,
    required = false,
    ...props
}: IProps<IForm> & NumericFormatProps) {
    const {
        field: { ref, onChange, value, ...field },
        fieldState: { error, isTouched },
    } = useController({
        name,
        control: methods.control,
        rules: {
            required: {
                value: required,
                message: `${label}ni kiriting`,
            },
        },
    })

    return (
        <fieldset
            className={cn("flex flex-col gap-1 w-full", wrapperClassName)}
        >
            {label && (
                <Label
                    htmlFor={name}
                    className={cn(
                        !!error && "text-destructive",
                        "cursor-pointer",
                        "text-base font-semibold",
                    )}
                >
                    {label}
                </Label>
            )}
            <NumericFormat
                id={name}
                className={cn(
                    "flex h-9 w-full rounded-md border border-input bg-gray-100 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                    className,
                    isTouched &&
                        !!error &&
                        !label &&
                        "border-destructive focus:border-border !ring-destructive",
                )}
                thousandSeparator={" "}
                getInputRef={ref}
                placeholder={label}
                value={Number(value) || ""}
                onValueChange={(val) => {
                    onChange(val.floatValue || "")
                }}
                allowNegative={false}
                {...field}
                {...props}
            />
            {!!error && !hideError && (
                <ErrorMessage>{error.message}</ErrorMessage>
            )}
        </fieldset>
    )
}
