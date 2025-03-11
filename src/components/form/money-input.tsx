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
    decimalSeparator?: string
    hideError?: boolean
    required?: boolean
    suffix?: string
}

export default function FormMoneyInput<IForm extends FieldValues>({
    methods,
    name,
    label,
    placeholder,
    wrapperClassName,
    className,
    formatOptions,
    thousandSeparator = " ",
    suffix = " UZS",
    decimalSeparator,
    hideError = false,
    required = false,
    ...props
}: IProps<IForm> & NumericFormatProps) {
    const {
        field: { ref, ...field },
        fieldState: { error, isTouched },
    } = useController({
        name,
        control: methods.control,
        rules: {
            required: {
                value: required,
                message: `${label || placeholder}ni kiriting`,
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
                    required={required}
                    className={cn(
                        !!error && "text-red-600",
                        "cursor-pointer",
                        "text-sm font-semibold",
                    )}
                >
                    {label}
                </Label>
            )}
            <NumericFormat
                id={name}
                className={cn(
                    "flex h-9 w-full rounded-md border border-input bg-background dark:bg-[#262730] px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                    className,
                    isTouched &&
                        !!error &&
                        !label &&
                        "border-destructive focus:border-border !ring-destructive",
                )}
                thousandSeparator={thousandSeparator}
                decimalSeparator={decimalSeparator}
                getInputRef={ref}
                suffix={suffix}
                {...props}
                {...field}
                onValueChange={field.onChange}
                placeholder={placeholder || label}
                disabled={field.disabled || props.disabled}
            />
            {!!error && !hideError && (
                <ErrorMessage>{error.message}</ErrorMessage>
            )}
        </fieldset>
    )
}
