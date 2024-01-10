'use client'
import * as React from "react"
import {
  CaretSortIcon, DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/client/components/ui/button"
import { Checkbox } from "@/client/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/client/components/ui/table"
import { GetRechargesQuery, GetRechargesQueryVariables, useGetRechargesQuery } from "@/client/graphql/__generated__/recharge.generated"
import dayjs from 'dayjs'
import { keepPreviousData } from "@tanstack/react-query"
import { OrderBy, Recharge_Status } from "@/client/graphql/__generated__/types.generated"
import { UpdateRechargeModal } from "./modals/update-recharge.modal"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/client/components/ui/dropdown-menu"

const EMPTY_ARRAY: any[] = []
export default function Recharges() {
  const [variables, setVariables] = React.useState<GetRechargesQueryVariables>({take: 10, skip: 0, orderBy: {createdAt: OrderBy.Desc}})
  const {data} = useGetRechargesQuery(variables, {placeholderData: keepPreviousData})

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const columns: ColumnDef<GetRechargesQuery['recharges'][0]>[] = React.useMemo(() => [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableHiding: false,
    },
    {
      accessorKey: "user",
      header: "User",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue<GetRechargesQuery['recharges'][0]['user']>("user").name}</div>
      ),
    },
    {
      accessorKey: "amount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => setVariables(oldVariables => ({...oldVariables, orderBy: {amount: oldVariables.orderBy?.amount === OrderBy.Desc? OrderBy.Asc: OrderBy.Desc}}))}
          >
            Amount
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"))
  
        // Format the amount as a dollar amount
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
  
        return <div className="font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("status")}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      cell: ({ row }) => dayjs(row.getValue("createdAt")).format('YYYY-MM-DD HH:mm:ss'),
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => setVariables(oldVariables => ({...oldVariables, orderBy: {createdAt: oldVariables.orderBy?.createdAt === OrderBy.Desc? OrderBy.Asc: OrderBy.Desc}}))}
          >
            Created at
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "updatedAt",
      cell: ({ row }) => dayjs(row.getValue("updatedAt")).format('YYYY-MM-DD HH:mm:ss'),
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => setVariables(oldVariables => ({...oldVariables, orderBy: {updatedAt: oldVariables.orderBy?.updatedAt === OrderBy.Desc? OrderBy.Asc: OrderBy.Desc}}))}
          >
            Updated at
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },  },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {  
        return (
          row.getValue("status") === Recharge_Status.Pending && 
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={event => event.preventDefault()}
              >
                <UpdateRechargeModal recharge={row.original} />
              </DropdownMenuItem>
              
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ], [])
  
  const table = useReactTable({
    data: data?.recharges || EMPTY_ARRAY,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
       <div className="flex items-center justify-between py-4"></div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setVariables(oldVariables => ({...oldVariables, skip: oldVariables.skip - oldVariables.take}))}
            disabled={!variables.skip}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>setVariables(oldVariables => ({...oldVariables, skip: oldVariables.skip + oldVariables.take}))}
            disabled={!data?.rechargeTotalCount || (variables.skip + data.recharges.length) >= data.rechargeTotalCount}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
