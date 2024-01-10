import prisma from '@/server/drives/prisma';

import { recharges } from './recharge.fixture';
import { users } from './user.fixture';

export async function initFixture() {
	await prisma.recharge.deleteMany();
	await prisma.user.deleteMany();
	await prisma.user.createMany({ data: users });
	await prisma.recharge.createMany({ data: recharges });
}
