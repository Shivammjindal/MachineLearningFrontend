"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Navbar from "../components/Navbar"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import Image from "next/image"

interface DataProps{
  cardno: string,
  type: string,
  devicetype: string
}

export default function ContributionForm() {

  const session = useSession()
  const [open, setOpen] = useState(false)

  const form = useForm({
    defaultValues: {
      cardno: "",
      type: "",
      devicetype:""
    },
  })

  const onSubmit = async (data: DataProps) => {

    const str = data.cardno.replaceAll(" ","")
    const isOnlyIntegers = (str: string) => /^\d+$/.test(str);

    if(str.length !== 16 || !isOnlyIntegers(str)){
      return toast.error('Invalid Card Number')
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/addtransaction`, {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          user : session.data?.user.id,
          cardno : data.cardno,
          type : data.type,
          device : data.devicetype
        })
      })

      if(!response.ok){
        return toast.error('Invalid Inputs Entered')
      }

    } catch (error) {
      console.log(error)
      return toast.error('An Error Occured')
    }

    setOpen(true)
    toast.success('Your contribution recorded successfully')
    form.reset()
  }

  return (
    <div>
        <Navbar/>
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="bg-card shadow-lg rounded-2xl p-6 w-full max-w-md">
            <h1 className="text-2xl font-bold text-violet-700 dark:text-violet-400 mb-4 text-center">
            Contribution Form
            </h1>

            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Transaction Input */}
                <FormField
                control={form.control}
                name="cardno"
                rules={{ required: "Transaction is required" }}
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-violet-700 dark:text-violet-400">Card Number </FormLabel>
                    <FormControl>
                        <Input
                        {...field}
                        placeholder="6522 19XX XXXX XXXX"
                        className="text-violet-800 dark:text-violet-200 border border-input focus-visible:border-violet-400 focus-visible:ring-0"
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                {/* Transaction Type Select */}
                <FormField
                control={form.control}
                name="type"
                rules={{ required: "Please select a transaction type" }}
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-violet-700 dark:text-violet-400">Card Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger className="w-full border border-input focus:border-violet-500 focus:outline-none text-violet-800 dark:text-violet-200">
                            <SelectValue placeholder="Select a transaction type" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="rupay">Rupay</SelectItem>
                        <SelectItem value="mastercard">MasterCard</SelectItem>
                        <SelectItem value="visa">Visa</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />

    <FormField
                control={form.control}
                name="devicetype"
                rules={{ required: "Please select a transaction type" }}
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-violet-700 dark:text-violet-400">Transaction Device Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger className="w-full border border-input focus:border-violet-500 focus:outline-none text-violet-800 dark:text-violet-200">
                            <SelectValue placeholder="Select a transaction type" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="mobile">Mobile</SelectItem>
                        <SelectItem value="tablet">Tablet</SelectItem>
                        <SelectItem value="laptop">Laptop</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />

                {/* Submit Button */}
                <Button type="submit" className="w-full bg-violet-700 hover:bg-violet-800 text-white">
                Submit
                </Button>
            </form>
            </Form>

            {/* Thank You Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                <DialogTitle className="text-violet-700 dark:text-violet-400">Thank You!</DialogTitle>
                    <Image src="https://media.istockphoto.com/id/1397892955/photo/thank-you-message-for-card-presentation-business-expressing-gratitude-acknowledgment-and.jpg?s=612x612&w=0&k=20&c=7Lyf2sRAJnX_uiDy3ZEytmirul8pyJWm4l2fxiUtdvk=" alt="" />
                <DialogDescription className="flex justify-center text-xl text-violet-600 dark:text-violet-300">
                    We appreciate your contribution.
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
            </Dialog>
        </div>
        </div>
    </div>
  )
}
