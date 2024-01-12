import { Prisma } from '@prisma/client';

import { UsersFilter, UsersOrderBy } from '../entities';

export interface GetUsersPayload {
	take: number;
	skip: number;
	where: typeof UsersFilter.$inferInput;
	orderBy: typeof UsersOrderBy.$inferInput;
	include?: Prisma.UserInclude;
}
