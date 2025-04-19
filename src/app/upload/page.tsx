"use client"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from "@/components/ui/form"
import { BsArrowRight } from "react-icons/bs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "../components/Navbar"
import { CloudUpload, LoaderCircle } from "lucide-react"
import { upload } from "@imagekit/next"
import { authenticator } from "@/context/ImageKitProvider"
import { UploadResponse } from "@imagekit/next"

interface DataProps{
    title : string,
    description : string,
    reel : File
}

interface ReelUploadProps{
    reel: File
}

export default function UploadImage(){

    const form = useForm<DataProps>()
    const [fileName, setFileName] = useState<string | undefined>("")
    const [fileId, setFileId] = useState<string>("")
    const inputFile = useRef<HTMLInputElement>(null)

    const [progress, setProgress] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [formLoading, setFormLoading] = useState<boolean>(false)

    const abortSignal = new AbortController()

    const onChangeUpload = async ({ reel } : ReelUploadProps) => {

        setLoading(true)

        if(fileId.length > 0){
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/imagekit-delete`
                ,{
                    method: "POST",
                    body: JSON.stringify({
                        'fileId':fileId
                    })
                }
            )
            console.log(res)
        }

        const { signature, expire, token } = await authenticator()
        const uploadResponse:UploadResponse = await upload({
            signature,
            publicKey : process.env.NEXT_PUBLIC_PUBLIC_KEY!,
            expire,
            token,
            file: reel,
            fileName: reel.name,
            onProgress: (ev) => {
                setProgress((ev.loaded/ev.total) * 100)
                console.log(progress)
            },
            abortSignal: abortSignal.signal
        })

        console.log(uploadResponse)
        setFileId(uploadResponse.fileId!)
        setLoading(false)
    }

    const onSubmit = async (data : DataProps) => {

        setFormLoading(true)

        setFormLoading(false)

    }

    return (
        <div>
            <Navbar/>
            <div className="flex justify-center mt-20 dark:bg-background p-4">
                
                <Card className="w-full mb-28 max-w-10/12 border-0 shadow-none dark:border-violet-500">
                    <CardHeader>
                        <CardTitle className="text-center text-3xl font-bold text-violet-700 dark:text-violet-100">
                            Upload Your Reel
                        </CardTitle>
                    </CardHeader>

                    <CardContent>

                        <Form {...form}>

                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    defaultValue={""}
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel className="text-violet-700 dark:text-violet-100">Title</FormLabel>
                                        <FormControl>
                                            <Input className="focus-visible:ring-0 focus-visible:outline-none" placeholder="Title" {...field} />
                                        </FormControl>
                                        <FormDescription className="text-violet-700 dark:text-violet-100">
                                            Enter an appropiate title for your reel.
                                        </FormDescription>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    defaultValue={""}
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-violet-700 dark:text-violet-100">Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Description" className="h-30 focus-visible:ring-0 focus-visible:outline-none" {...field}/>
                                            </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="reel"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="text-violet-700 dark:text-violet-100"></FormLabel>
                                                <input 
                                                    accept="image/*"  
                                                    type="file" 
                                                    ref={(e) => {
                                                        inputFile.current = e,
                                                        field.ref(e)
                                                    }}
                                                    className="text-violet-700 hidden dark:text-violet-100 dark:bg-violet-600"
                                                    onChange={(e:React.ChangeEvent<HTMLInputElement>
                                                    ) => {
                                                        onChangeUpload({
                                                            reel : e.target?.files?.[0] as File
                                                        })
                                                        const file = e.target?.files?.[0]
                                                        field.onChange(file)
                                                        setFileName(e.target?.files?.[0].name)
                                                    }} 
                                                />
                                                <div className="flex items-center font-medium gap-5 text-violet-600 dark:text-violet-100">
                                                    <Button
                                                        disabled={loading}
                                                        type="button"
                                                        onClick = {
                                                            () => inputFile.current?.click()
                                                        }
                                                        className="dark:bg-violet-600 w-44 transition-all duration-700 dark:hover:bg-violet-700 text-violet-600 bg-white disabled:cursor-not-allowed 
                                                        ring-1 dark:ring-0 hover:bg-violet-100 dark:text-white"
                                                    >
                                                        <CloudUpload/>
                                                        <span>Upload File</span>
                                                        {loading && <div className="flex items-center justify-center">
                                                            <LoaderCircle className="text-violet-600 animate-spin w-8 h-8 dark:text-violet-50" />
                                                        </div>}
                                                    </Button>
                                                    <span>
                                                        {fileName}
                                                    </span>
                                                </div>
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold">
                                    Upload your Reel <span><BsArrowRight strokeWidth={0.8} className=""/></span>
                                </Button>

                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}