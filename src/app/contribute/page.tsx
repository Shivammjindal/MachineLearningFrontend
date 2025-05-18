'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import { FadeLoader } from "react-spinners"
import { toast } from 'sonner'

interface contribute{
  _id: string,
  user: string,
  cardno: string,
  CardType: string,
  Time: string,
  Date: string,
  Amount: number,
  TypeOfGoods: string,
  Location: string,
  __v: 0
}

export default function ContributionList() {

  const [contributions, setContributions] = useState<contribute[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const getPosts = async () => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mycontributions`)
    if(!response.ok){
      setLoading(false)
      return toast.error('Something went wrong')
    }

    const data = await response.json()
    console.log(data)
    const contribution = data || []
    console.log(contribution)
    setLoading(false)
    setContributions(contribution)

  }

  useEffect(() => {
    getPosts()
  },[])

  return (
    <>
    <Navbar/>
    {!loading ? <section className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-violet-600 dark:text-violet-400">
          My Contributions
        </h2>
        <Button asChild>
          <Link href="/new-contribution" className='bg-violet-600 dark:text-white hover:bg-violet-700 transition-all duration-500'> + New Contribution</Link>
        </Button>
      </div>

      <Separator className="mb-6" />

      {/* List */}
      <div className="space-y-6">

        {
          contributions.length === 0 ? 
            <div>
              You have no contribuion till now
            </div>
        : contributions.map((contrib, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-xl text-violet-600 dark:text-violet-400">
                  {index+1}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex gap-5'>
                    <p className="text-muted-foreground mb-2">{contrib.cardno}</p>
                    <p className="text-muted-foreground mb-2">{contrib.CardType}</p>
                </div>
                <div className='flex gap-5'>
                  <p className="text-muted-foreground mb-2">{contrib.Time}</p>
                  <p className="text-muted-foreground mb-2">{contrib.Location}</p>
                  <p className="text-muted-foreground mb-2">{contrib.TypeOfGoods}</p>
                </div>
              </CardContent>
            </Card>
        ))}
      </div>
    </section> 
      :
      <div className='flex justify-center h-screen items-center'>
        <FadeLoader radius={1} color='#8F00FF' height={10} width={3} />
      </div>
    }
    </>
  )
}
