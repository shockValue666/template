"use client";
import React from 'react'
import { Icon, LayoutDashboardIcon, LogOutIcon, LucideProps, PackageIcon, SettingsIcon, ShoppingCartIcon, StarIcon, UsersIcon } from 'lucide-react'
import Link from 'next/link'
import MobileSideNav from './mobile-sidenav'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import ToggleButton from '@/components/globals/toggle-button'
import { useClerk } from '@clerk/nextjs'
import {UserResource} from "@clerk/types"
import { Profile, User } from '@prisma/client';

interface Props {
    user:Partial<Profile> | null | undefined 
}

const DesktopNavBar:React.FC<Props> = ({user}) => {
    const {signOut} = useClerk();
  return (
     <div className='hidden md:flex h-screen w-60 flex-col border-r bg-muted/40'>
                <div className='p-6'>
                    <h2 className='flex items-center text-2xl font-semibold'>
                        <StarIcon className='mr-2 h-6 w-6'/>
                        sidenav
                    </h2>
                </div>

                <ScrollArea className='flex-1'>
                    <nav className='flex flex-col gap-2 p-4'>
                        <NavItem href="/dashboard">
                            <LayoutDashboardIcon className="mr-2 h-4 w-4"/>
                            Dashboard
                        </NavItem>
                        <NavItem href="/users">
                            <UsersIcon className="mr-2 h-4 w-4"/>
                            Users
                        </NavItem>
                        <NavItem href="/dashboard">
                            <ShoppingCartIcon className="mr-2 h-4 w-4"/>
                            Orders
                        </NavItem>
                        <NavItem href="/dashboard">
                            <PackageIcon className="mr-2 h-4 w-4"/>
                            Products
                        </NavItem>
                        <NavItem href="/dashboard">
                            <SettingsIcon className="mr-2 h-4 w-4"/>
                            Settings
                        </NavItem>
                    </nav>
                </ScrollArea>

                <div className='w-full text-center'>
                    <ToggleButton className="ml-1 border-4 border-border"/>
                </div>

                <div className='mt-auto p-4 flex flex-col gap-y-8'>
                    {user && user?.email && <div className='flex items-center gap-4 rounded-lg bg-muted p-4'>
                        <Avatar />
                        <div className='flex flex-col'>
                            <span className='text-sm font-medium '>{user.email.split("@")[0]}</span>
                            <span className='text-xs text-muted-foreground break-all '>{user.email}</span>
                        </div>
                    </div>}
                    <Button variant={"ghost"} onClick={()=>signOut({redirectUrl:"/"})} className='w-full justify-start mt-4'>
                        <Link href="#" prefetch={false}>
                        <LogOutIcon/>
                        Log out
                        </Link>
                    </Button>
                </div>
        </div>
  )
}

export default DesktopNavBar


function NavItem({ href, children }:{href:string, children:React.ReactNode}) {
  return (
    <Button variant="ghost" className="w-full justify-start" asChild>
      <Link href={href} prefetch={false}>
        {children}
      </Link>
    </Button>
  )
}