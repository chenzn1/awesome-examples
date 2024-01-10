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
import { useToast } from '@/client/components/ui/use-toast';
import { useCreateUserMutation } from '@/client/graphql/__generated__/user.generated';
import { QUERY_CLIENT } from '@/client/utils/react-query';

export function CreateUserModal() {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState('');
	const { toast } = useToast();

	const { mutate, isPending } = useCreateUserMutation({
		onSuccess: () => {
			QUERY_CLIENT.invalidateQueries({ queryKey: ['getUsers'] });
			toast({ title: 'Create user successfully.' });
			setOpen(false);
		},
	});
	return (
		<Dialog
			open={open}
			onOpenChange={open => {
				setOpen(open);
				setName('');
			}}
		>
			<DialogTrigger asChild>
				<Button variant="outline">Create</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create user</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name
						</Label>
						<Input
							id="name"
							value={name}
							className="col-span-3"
							onChange={event => setName(event.currentTarget?.value)}
						/>
					</div>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Close</Button>
					</DialogClose>
					<Button
						type="submit"
						disabled={isPending}
						onClick={() => mutate({ data: { name } })}
					>
						Create
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
