import { useState } from 'react';

import { Button } from '@/client/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/client/components/ui/dialog';
import { Input } from '@/client/components/ui/input';
import { Label } from '@/client/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/client/components/ui/select';
import { useToast } from '@/client/components/ui/use-toast';
import {
	GetRechargesQuery,
	useUpdateRechargeMutation,
} from '@/client/graphql/__generated__/recharge.generated';
import { Recharge_Status } from '@/client/graphql/__generated__/types.generated';
import { QUERY_CLIENT } from '@/client/utils/react-query';

interface UpdateRechargeModalProps {
	recharge: GetRechargesQuery['recharges'][0];
}

export function UpdateRechargeModal({ recharge }: UpdateRechargeModalProps) {
	const [open, setOpen] = useState(false);
	const [amount, setAmount] = useState(0);
	const [status, setStatus] = useState<Recharge_Status>(
		Recharge_Status.Pending,
	);
	const { toast } = useToast();

	const { mutate, isPending } = useUpdateRechargeMutation({
		onSuccess: () => {
			QUERY_CLIENT.invalidateQueries({ queryKey: ['getRecharges'] });
			toast({ title: 'Update recharge successfully.' });
			setOpen(false);
		},
	});
	return (
		<Dialog
			open={open}
			onOpenChange={open => {
				setOpen(open);
				setAmount(Number(recharge.amount));
				setStatus(recharge.status);
			}}
		>
			<DialogTrigger asChild>
				<div className="cursor-pointer">Update</div>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Update recharge</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Amount
						</Label>
						<Input
							type="number"
							id="name"
							value={amount}
							className="col-span-3"
							onChange={event => setAmount(Number(event.currentTarget?.value))}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Status
						</Label>
						<Select
							onValueChange={status => setStatus(status as Recharge_Status)}
							value={status}
						>
							<SelectTrigger className="w-[180px]">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value={Recharge_Status.Pending}>Pending</SelectItem>
								<SelectItem value={Recharge_Status.Succeeded}>
									Succeeded
								</SelectItem>
								<SelectItem value={Recharge_Status.Failed}>Failed</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Close</Button>
					</DialogClose>
					<Button
						type="submit"
						disabled={isPending}
						onClick={() =>
							mutate({ id: recharge.id, data: { amount, status } })
						}
					>
						Update
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
