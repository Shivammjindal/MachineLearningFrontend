"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select"
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form"
import Navbar from "../components/Navbar"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import Image from "next/image"

interface DataProps {
  cardno: string,
  CardType: string,
  Time: string,
  Date: string,
  Amount: number,
  TypeOfGoods: string,
  Location: string
}

export default function ContributionForm() {
  const session = useSession()
  const [open, setOpen] = useState(false)

  const form = useForm<DataProps>({
    defaultValues: {
      cardno: "",
      CardType: "",
      Time: "",
      Date: "",
      Amount: 0,
      TypeOfGoods: "",
      Location: ""
    },
  })

  const onSubmit = async (data: DataProps) => {
    const str = data.cardno.replaceAll(" ", "")
    const isOnlyIntegers = (str: string) => /^\d+$/.test(str)

    if (str.length !== 16 || !isOnlyIntegers(str)) {
      return toast.error('Invalid Card Number')
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/addtransaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: session.data?.user.email,
          ...data
        }),
      })

      if (!response.ok) return toast.error('Invalid Inputs Entered')

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
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="bg-card shadow-lg rounded-2xl p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold text-violet-700 dark:text-violet-400 mb-4 text-center">
            Check Your Transaction
          </h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Card Number */}
              <FormField
                control={form.control}
                name="cardno"
                rules={{ required: "Card number is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="6522 19XX XXXX XXXX" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Card Type */}
              <FormField
                control={form.control}
                name="CardType"
                rules={{ required: "Please select a card type" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select card type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Rupay">Rupay</SelectItem>
                        <SelectItem value="MasterCard">MasterCard</SelectItem>
                        <SelectItem value="Visa">Visa</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Time */}
              <FormField
                control={form.control}
                name="Time"
                rules={{ required: "Time is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date */}
              <FormField
                control={form.control}
                name="Date"
                rules={{ required: "Date is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Amount */}
              <FormField
                control={form.control}
                name="Amount"
                rules={{ required: "Amount is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} min={0}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Type of Goods */}
              <FormField
                control={form.control}
                name="TypeOfGoods"
                rules={{ required: "Type of goods is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of Goods</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. Electronics" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location */}
              <FormField
                control={form.control}
                name="Location"
                rules={{ required: "Location is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. Mumbai" />
                    </FormControl>
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
                <DialogTitle>Thank You!</DialogTitle>
                <Image src="https://media.istockphoto.com/id/1397892955/photo/thank-you-message-for-card-presentation-business-expressing-gratitude-acknowledgment-and.jpg?s=612x612&w=0&k=20&c=7Lyf2sRAJnX_uiDy3ZEytmirul8pyJWm4l2fxiUtdvk=" alt="" width={500} height={500} />
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