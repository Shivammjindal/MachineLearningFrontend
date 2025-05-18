"use client"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { BsGithub, BsArrowRight } from "react-icons/bs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface DataProps{
    email : string,
    password : string
}

export default function SignUp(){

    const form = useForm({
        defaultValues:{
            email : "",
            password: ""
        }
    })
    const router = useRouter()

    const onSubmit = async (data : DataProps) => {
        
        const result = await signIn("credentials", {
            redirect: false,
            email : data.email,
            password : data.password
        })

        if(result?.status === 400 || result?.status === 404 || result?.status === 402){
            return toast.error('Invalid Credentials')
        }

        toast.success('Logged In Successfully')
        router.push('/')
    }

    return (
        <div className="flex justify-center items-center min-h-screen  dark:bg-background p-4">

            <Card className="w-full max-w-sm rounded-2xl border border-violet-300 dark:border-violet-500 shadow-2xl dark:shadow-violet-900">
                <CardHeader>
                    <CardTitle className="text-center text-3xl font-bold text-violet-700 dark:text-violet-100">
                        Login
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                defaultValue={""}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-violet-700 dark:text-violet-100">Email</FormLabel>
                                    <FormControl>
                                    <Input className="focus-visible:ring-0 focus-visible:outline-none" type="email" placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                defaultValue={""}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-violet-700 dark:text-violet-100">Password</FormLabel>
                                    <FormControl>
                                        <Input className="focus-visible:ring-0 focus-visible:outline-none" type="password" placeholder="••••••••" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <div className="mt-6 space-y-2">

                                <Button
                                    variant="outline"
                                    className="w-full flex items-center gap-2 justify-center border-violet-300 dark:border-violet-600 text-violet-900 dark:text-violet-100 hover:bg-violet-50 dark:hover:bg-violet-900"
                                    onClick={() => signIn("github").then(() => {
                                        toast.success('Logged In Successfully')
                                    })}
                                >
                                <BsGithub className="w-5 h-5" />
                                    Continue with GitHub
                                </Button>
                            </div>
                            <Button 
                                type="submit" 
                                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold"
                            >
                                Login <span><BsArrowRight strokeWidth={0.8} className=""/></span>
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}