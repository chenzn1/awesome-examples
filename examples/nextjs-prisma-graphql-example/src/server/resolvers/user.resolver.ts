import prisma from "../drives/prisma";
import { User, UsersFilter, UsersOrderBy } from "../entities";
import builder from "../graphql-builder";

builder.queryFields(t => ({
  users: t.prismaField({
		type: [User],
		nullable: false,
		args: {
			take: t.arg({ type: 'Int', required: true }),
			skip: t.arg({ type: 'Int', required: true }),
			where: t.arg({ type: UsersFilter, required: false }),
			orderBy: t.arg({ type: UsersOrderBy, required: false }),
		},
		resolve: async (args, __, extArgs, ctx) => {
			const { where, orderBy, take, skip } = extArgs;
			const list = await prisma.user.findMany({
				...args,
				where: {
					...where,
          deleted: false
				},
				take,
				skip,
				orderBy: orderBy ? orderBy : { createdAt: 'desc' },
			});

			return list;
		},
	}),
}))