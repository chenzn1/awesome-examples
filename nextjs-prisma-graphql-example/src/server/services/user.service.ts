import { Prisma } from '@prisma/client';

import prisma from '../drives/prisma';
import { CreateUserInput } from '../entities';
import { UserNotFoundError } from '../errors';

export async function getUser(id: string) {
	const user = await prisma.user.findUnique({ where: { id, deleted: false } });
	if (!user) {
		throw new UserNotFoundError({ id });
	}
	return user;
}

export async function createUser({ name }: typeof CreateUserInput.$inferInput) {
	const user = await prisma.user.create({
		data: { name, balance: new Prisma.Decimal(0) },
	});
	return user;
}

export async function updateUser(
	id: string,
	{ name }: typeof CreateUserInput.$inferInput,
) {
	await getUser(id);
	const user = await prisma.user.update({ where: { id }, data: { name } });
	return user;
}

export async function deleteUser(id: string) {
	await getUser(id);
	await prisma.user.delete({ where: { id } });
	return true;
}
