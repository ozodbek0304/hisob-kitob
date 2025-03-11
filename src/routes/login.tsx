import FormInput from "@/components/form/input"
import { Button } from "@/components/ui/button"
import { setAccessToken } from "@/lib/set-token"
import { LOGIN, REGISTER } from "@/services/api-endpoints"
import { usePost } from "@/services/https"
import { createFileRoute, Link } from "@tanstack/react-router"
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
    const { error, mutate, isError, isPending } = usePost(
        {
            onSuccess: (data) => {
                const access = data?.access_token
                if (access) {
                    setAccessToken(access)
                    toast.success("Successfully")
                    window.location.replace("/")
                }
            },
        },
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }

    )
    const methods = useForm<Form>({})

    const onSubmit = methods.handleSubmit((vals) => {
        mutate(LOGIN, vals,)
    })

    return (
        <div className="max-w-md m-auto  h-screen flex justify-center items-center relative">
            <form
                onSubmit={onSubmit}
                className="w-full  p-4 py-6 border dark:border-gray-800 dark:shadow rounded-xl flex justify-center flex-col gap-4"
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
                <Button type="submit" variant={"outline"} className="  w-full bg-gray-50 dark:bg-[#262730] hover:border-red-500  hover:bg-red-50 hover:text-red-600" loading={isPending}>
                    Kirish
                </Button>
                <Link to="/register" className="text-end text-md hover:text-red-600">
                    Ro'yxatdan o'tish
                </Link>

                {isError && (
                    <p className="text-red-600 text-center">
                        {error?.response?.data?.detail}
                    </p>
                )}
            </form>
        </div>
    )
}
