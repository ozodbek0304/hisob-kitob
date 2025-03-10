import FormInput from "@/components/form/input"
import { Button } from "@/components/ui/button"
import { setAccessToken, setRefreshToken } from "@/lib/set-token"
import { LOGIN } from "@/services/api-endpoints"
import { usePost } from "@/services/https"
import { createFileRoute } from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export const Route = createFileRoute("/login")({
    component: Login,
})

type Form = {
    username: string
    password: string
}

function Login() {
    const { error, mutate, isError, isPending } = usePost({
        onSuccess: (data) => {
            const access = data?.access
            const refresh = data?.refresh

            if (access) {
                setAccessToken(access)
                toast.success("Successfully")
            }
            if (refresh) {
                setRefreshToken(refresh)
            }
            window.location.replace("/")
        },
    })
    const methods = useForm<Form>({})

    const onSubmit = methods.handleSubmit((vals) => {
        mutate(LOGIN, vals)
    })

    return (
        <div className="max-w-md m-auto h-screen flex justify-center items-center">
            <form
                onSubmit={onSubmit}
                className="w-full  p-4 py-6 border rounded-xl flex justify-center flex-col gap-4"
            >
                <FormInput
                    methods={methods}
                    name="username"
                    label="Login"
                    required
                />
                <FormInput
                    methods={methods}
                    name="password"
                    type="password"
                    label="Parol"
                    required
                />
                <Button type="submit" loading={isPending}>
                    Kirish
                </Button>

                {isError && (
                    <p className="text-destructive text-center">
                        {error?.response?.data?.detail}
                    </p>
                )}
            </form>
        </div>
    )
}
