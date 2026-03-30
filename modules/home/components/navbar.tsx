"use client"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle" 

import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser
} from "@clerk/nextjs"

import { UserRole } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

type Props = {
  userRole?: UserRole
}

const Navbar = ({ userRole }: Props) => {
  const { isSignedIn, isLoaded } = useUser()

  // avoid hydration flicker
  if (!isLoaded) return null

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-5xl px-4">
      <div className="bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20 transition-all duration-200 hover:bg-white/15 dark:hover:bg-black/15">
        
        <div className="px-6 py-4 flex justify-between items-center">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="TreeBio" width={42} height={42} />
            <span className="font-bold text-2xl tracking-widest text-amber-300">
              LeetCode
            </span>
          </Link>

          {/* NAV LINKS */}
          <div className="flex items-center gap-x-4">
            <Link href="/problems" className="nav-link">Problems</Link>
            <Link href="/about" className="nav-link">About</Link>
            <Link href="/profile" className="nav-link">Profile</Link>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-4">
            <ModeToggle />

            {isSignedIn ? (
              <>
                {userRole === UserRole.ADMIN && (
                  <Link href="/create-problem">
                    <Button variant="outline">Create Problem</Button>
                  </Link>
                )}
                <UserButton />
              </>
            ) : (
              <div className="flex items-center gap-2">
                <SignInButton>
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </SignInButton>

                <SignUpButton>
                  <Button size="sm" className="bg-amber-400 hover:bg-amber-500 text-white">
                    Sign Up
                  </Button>
                </SignUpButton>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar