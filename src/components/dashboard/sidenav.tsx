import { Icon, LayoutDashboardIcon, LogOutIcon, LucideProps, PackageIcon, SettingsIcon, ShoppingCartIcon, StarIcon, UsersIcon } from 'lucide-react'
import React from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Avatar } from '../ui/avatar'
import MobileSideNav from './mobile-sidenav'

const SideNav = () => {
  return (
    <>
        <div className='block md:hidden'>
            <MobileSideNav/>
        </div>

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

                <div className='mt-auto p-4'>
                    <div className='flex items-center gap-4 rounded-lg bg-muted p-4'>
                        <Avatar />
                        <div className='flex flex-col'>
                            <span className='text-sm font-medium'>John Doe</span>
                            <span className='text-xs text-muted-foreground'>john@example.com</span>
                        </div>
                    </div>
                    <Button variant={"ghost"} className='w-full justify-start mt-4'>
                        <Link href="/logout" prefetch={false}>
                        <LogOutIcon/>
                        Log out
                        </Link>
                    </Button>
                </div>
        </div>
    </>
  )
}

export default SideNav

function NavItem({ href, children }:{href:string, children:React.ReactNode}) {
  return (
    <Button variant="ghost" className="w-full justify-start" asChild>
      <Link href={href} prefetch={false}>
        {children}
      </Link>
    </Button>
  )
}