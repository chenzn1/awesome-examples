'use client'
import * as React from "react"
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/client/components/ui/button"
import { Checkbox } from "@/client/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/client/components/ui/dropdown-menu"
import { Input } from "@/client/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/client/components/ui/table"
import { GetUsersQuery, GetUsersQueryVariables, useGetUsersQuery } from "@/client/graphql/__generated__/user.generated"
import dayjs from 'dayjs'
import { keepPreviousData } from "@tanstack/react-query"
import { OrderBy } from "@/client/graphql/__generated__/types.generated"
import { CreateUserModal } from "./modals/create-user.modal"
import { UpdateUserModal } from "./modals/update-user.modal"
import { CreateRechargeModal } from "./modals/create-recharge.modal"

const EMPTY_ARRAY: any[] = []
export default function Users() {
  const [variables, setVariables] = React.useState<GetUsersQueryVariables>({take: 10, skip: 0, orderBy: {createdAt: OrderBy.Desc}})
  const {data} = useGetUsersQuery(variables, {placeholderData: keepPreviousData})

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const columns: ColumnDef<GetUsersQuery['users'][0]>[] = React.useMemo(() => [
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
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "balance",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => setVariables(oldVariables => ({...oldVariables, orderBy: {balance: oldVariables.orderBy?.balance === OrderBy.Desc? OrderBy.Asc: OrderBy.Desc}}))}
          >
            Balance
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const balance = parseFloat(row.getValue("balance"))
  
        // Format the balance as a dollar balance
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(balance)
  
        return <div className="font-medium">{formatted}</div>
      },
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
          // <UpdateUserModal user={row.original} />
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
                <UpdateUserModal user={row.original} />
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={event => event.preventDefault()}
              >
                                <CreateRechargeModal userId={row.original.id} />

              </DropdownMenuItem>
              
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ], [])
  
  const table = useReactTable({
    data: data?.users || EMPTY_ARRAY,
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
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter name..."
          // value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={event => setVariables(oldVariables => ({
            ...oldVariables,
            take: 10,
            skip: 0,
            where: event.currentTarget?.value? {name: {contains: event.currentTarget.value}}: undefined
          }))}

          className="max-w-sm"
        />
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <CreateUserModal />
        </div>
      </div>
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
            disabled={!data?.userTotalCount || (variables.skip + data.users.length) >= data.userTotalCount}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
