"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./Toggler"

interface user {
    name ?: string,
    email ?: string,
}

export default function Navbar(){

    const [loggedIn, setloggedIn] = useState(false)
    const [user, setUser] = useState<user | null>({
        name: 'Shivam Jindal',
        email: 'shivamjindals2002@gmial.com'
    })

    return (
        <nav className="w-full border-b bg-background shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                    GetReel
                </Link>
        
                {/* Navigation Links */}
                <div className="flex gap-4 items-center">
                    {loggedIn && <Link href="/your-reels">
                        <Button variant="ghost" className="text-base">Your Reels</Button>
                    </Link>}

                    <ModeToggle/>
                    {
                        loggedIn && <div className="font-medium">Hi { user?.name }</div>
                    }
                    {!loggedIn && <Link href="/login">
                        <Button variant="outline" className="text-base">Login</Button>
                    </Link>}
                    {!loggedIn && <Link href="/signup">
                        <Button className="text-base bg-violet-600 hover:bg-violet-700 text-white">
                        Signup
                        </Button>
                    </Link>}
                </div>
            </div>
        </nav>
    )
}