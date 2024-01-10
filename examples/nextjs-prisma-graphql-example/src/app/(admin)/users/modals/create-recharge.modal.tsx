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
import { useCreateRechargeMutation } from "@/client/graphql/__generated__/recharge.generated"
import { QUERY_CLIENT } from "@/client/utils/react-query"
import { useState } from "react"

interface CreateRechargeModalProps {
 userId: string
}
export function CreateRechargeModal({userId}: CreateRechargeModalProps) {
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState(0)
  const { toast } = useToast()

  const {mutate, isPending} = useCreateRechargeMutation({onSuccess: () => {
    QUERY_CLIENT.invalidateQueries({queryKey: ['getRecharges']})
    toast({title: "Create recharge successfully."})
    setOpen(false)
  }})
  return (
    <Dialog open={open} onOpenChange={open => {
      setOpen(open)
      setAmount(0)
    }}>
      <DialogTrigger asChild>
        <div className="cursor-pointer">Recharge</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create recharge</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Amount
            </Label>
            <Input type='number' id="name" value={amount} className="col-span-3" onChange={event => setAmount(Number(event.currentTarget?.value))} />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Close</Button>
          </DialogClose>
          <Button type="submit" disabled={isPending} onClick={() => mutate({data: {amount, userId}})}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
