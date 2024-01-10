import { Button } from "@/client/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/client/components/ui/dialog"
import { Input } from "@/client/components/ui/input"
import { Label } from "@/client/components/ui/label"
import { useToast } from "@/client/components/ui/use-toast"
import { useUpdateUserMutation, GetUsersQuery } from "@/client/graphql/__generated__/user.generated"
import { QUERY_CLIENT } from "@/client/utils/react-query"
import { useState } from "react"

interface UpdateUserModalProps {
  user: GetUsersQuery['users'][0]
}

export function UpdateUserModal({user}: UpdateUserModalProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const { toast } = useToast()

  const {mutate, isPending} = useUpdateUserMutation({onSuccess: () => {
    QUERY_CLIENT.invalidateQueries({queryKey: ['getUsers']})
    toast({title: "Update user successfully."})
    setOpen(false)
  }})
  return (
    <Dialog open={open} onOpenChange={open => {
      setOpen(open)
      setName(user.name)
    }}>
      <DialogTrigger asChild>
        <div className="cursor-pointer">Update</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update user</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={name} className="col-span-3" onChange={event => setName(event.currentTarget?.value)} />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Close</Button>
          </DialogClose>
          <Button type="submit" disabled={isPending} onClick={() => mutate({id: user.id, data: {name}})}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
