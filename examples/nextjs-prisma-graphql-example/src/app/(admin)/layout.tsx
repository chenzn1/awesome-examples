'use client'
import { QUERY_CLIENT } from "@/client/utils/react-query"
import { QueryClientProvider } from "@tanstack/react-query"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <div className="m-auto max-w-[1080px] py-[30px]">
        {children}
      </div>
  </QueryClientProvider>
  )
}
