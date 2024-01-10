'use client'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/client/components/ui/navigation-menu"
import { QUERY_CLIENT } from "@/client/utils/react-query"
import { QueryClientProvider } from "@tanstack/react-query"
import Link from "next/link"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <div className="m-auto max-w-[1080px] py-[30px]">
      <NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <Link href="/users" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Users
            </NavigationMenuLink>
          </Link>
    </NavigationMenuItem>
    <NavigationMenuItem>
    <Link href="/recharges" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Recharges
            </NavigationMenuLink>
          </Link>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
        {children}
      </div>
  </QueryClientProvider>
  )
}
